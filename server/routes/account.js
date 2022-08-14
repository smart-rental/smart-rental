import Stripe from "stripe";
import express from "express";
import User from "../models/user.model.js";

const stripe = new Stripe('sk_test_51LAq93DVsFX5e9sJojJMIflKiw2CKP82HnyA9VxRKvuOVQ1dioE2UEKi6rBVPYefFmdWCrMG81PYs6SGHtqiPBWo00aPOfzEyN', {
    apiVersion: "2020-08-27"
});

const router = express.Router();

//Create a landlords connected stripe account
router.route('/:userId').post(async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.User.findOne({userId});
        const {name, phoneNumber, email, userType, stripe_account } = user;
        if (userType === "Landlord" && stripe_account === undefined) {
            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                email,
                capabilities: {
                    card_payments: {requested: true},
                    transfers: {requested: true},
                    tax_reporting_us_1099_k: {requested: true}
                },
                business_type: "individual",
                individual: {
                    email
                },
                metadata: {
                    name,
                    phoneNumber,
                    email,
                }
            });
            const { id } = account;
            // Creating an account link
            const accountLink = await stripe.accountLinks.create({
                account: id,
                refresh_url: 'https://localhost:5000/',
                return_url: 'https://localhost:5000/',
                type: 'account_onboarding',
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
            })
        }
    } catch (e) {
        console.log(e);
    }
});

//Delete a landlords stripe account
router.route('/delete/:userId').delete(async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.User.findOne({userId});
        const {userType, stripe_account } = user;
        if (userType === "Landlord" && stripe_account !== undefined) {
            await stripe.accounts.del(stripe_account);
            const update = await User.User.findByIdAndUpdate(userId, {$unset: {stripe_account: 1}});
            res.send(update);
        } else {
            res.json({
                success: false,
                message: "stripe account does not exist"
            })
        }
    } catch (e) {
        console.log(e);
    }
});

//Checkout for renter

export default router;