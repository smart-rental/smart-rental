import Stripe from "stripe";
import express from "express";
import User from "../models/user.model.js";
import Property from "../models/properties.model.js";
import TenantCheckoutSessionModel from "../models/tenantCheckoutSession.model.js";

const stripe = new Stripe("sk_test_51LAq93DVsFX5e9sJojJMIflKiw2CKP82HnyA9VxRKvuOVQ1dioE2UEKi6rBVPYefFmdWCrMG81PYs6SGHtqiPBWo00aPOfzEyN", {
    apiVersion: "2020-08-27"
});

const router = express.Router();

//Create a customer and associate them with a subscription
router.post("/checkout-session/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.User.findOne({ _id: userId });
        const { name, phoneNumber, email, userType, stripe_account } = user;
        if (userType === "Tenant" && stripe_account === undefined) {
            const customer = await stripe.customers.create({
                email,
                name,
                phone: phoneNumber
            });
            const { id } = customer;
            const property = await Property.findOne({ tenant: userId });
            if (property) {
                const owner = await User.User.findOne({ ownerId: property.ownerId });
                const checkoutSession = await stripe.checkout.sessions.create({
                    line_items: [{
                        price: property.priceId,
                        quantity: 1
                    }],
                    mode: "subscription",
                    customer: id,
                    success_url: "http://localhost:3000/",
                    cancel_url: "http://localhost:3000/",
                    subscription_data: {
                        application_fee_percent: 123 * 0.10,
                        transfer_data: {
                            destination: owner.stripe_account
                        },
                        description: `Rent Payment for ${property.location}`
                    }
                });
                const checkoutSess = checkoutSession.id;
                const userInfo = await User.User.findByIdAndUpdate(userId, {
                    stripe_account: id
                });
                const tenantCheckoutSession = new TenantCheckoutSessionModel({
                    tenantId: userId,
                    checkoutSessionId: checkoutSess
                });
                await tenantCheckoutSession.save();
                res.json({
                    userInfo,
                    checkoutSession
                });
            } else {
                res.status(400).json({ belongToProperty: false });
            }
        } else {
            res.json({
                message: "stripe account created"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

//Delete a customer and automatically delete their subscription
router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.User.findOne({ _id: userId });
        const { userType, stripe_account } = user;
        if (userType === "Tenant" && stripe_account !== undefined) {
            await stripe.customers.del(
                stripe_account
            );
            const userInfo = await User.User.findByIdAndUpdate(userId, { $unset: { stripe_account: 1 } });
            res.json({
                userInfo,
                deleted: true
            });
        } else {
            res.json({
                message: "stripe account not deleted"
            });
        }
    } catch (e) {
        res.status(400).json(e);
    }
});

//Create a landlords connected stripe account
router.post("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.User.findOne({ userId });
        const { _id, name, phoneNumber, email, userType, stripe_account } = user;
        if (userType === "Landlord" && stripe_account === undefined) {
            const account = await stripe.accounts.create({
                type: "express",
                country: "US",
                email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                    tax_reporting_us_1099_k: { requested: true }
                },
                business_type: "individual",
                business_profile: {
                    product_description: "home for rent",
                    mcc: "6513"
                },
                individual: {
                    phone: phoneNumber,
                    email
                },
                metadata: {
                    name,
                    phoneNumber,
                    email
                }
            });
            const { id } = account;
            // Creating an account link
            const accountLink = await stripe.accountLinks.create({
                account: id,
                refresh_url: "http://localhost:3000/",
                return_url: `http://localhost:3000/profile/${_id}`,
                collect: "eventually_due",
                type: "account_onboarding"
            });
            //Update mongoDB with stripe account id
            const userInfo = await User.User.findByIdAndUpdate(userId, {
                stripe_account: id
            });
            res.json({
                userInfo,
                accountLink,
                account
            });
        } else {
            res.json({
                success: false,
                message: "stripe account already created"
            });
        }
    } catch (e) {
        res.status(400).json(e);
    }
});

//Delete a landlords connected stripe account
router.delete("/delete/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.User.findOne({ userId });
        const { userType, stripe_account } = user;
        if (userType === "Landlord" && stripe_account !== undefined) {
            await stripe.accounts.del(stripe_account);
            const update = await User.User.findByIdAndUpdate(userId, { $unset: { stripe_account: 1 } });
            res.send(update);
        } else {
            res.json({
                success: false,
                message: "stripe account does not exist"
            });
        }
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;