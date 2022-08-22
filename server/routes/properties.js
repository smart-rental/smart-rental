import Property from "../models/properties.model.js";
import User from "../models/user.model.js";
import express from "express";
import imageUploader from "../middleware/imageUploader.js";
import Stripe from "stripe";
import TenantCheckoutSessionModel from "../models/tenantCheckoutSession.model.js";
import cloudinary from "../utils/Cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27"
});

const router = express.Router();

/**
 * Retrieve properties with given pagination
 */
router.get("/", async (req, res) => {
    try {
        const PAGE_SIZE = 10;
        const page = parseInt(req.query.page || "0");
        const total = await Property.countDocuments({ post: true });
        const property = await Property.find({ post: true })
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page);
        res.json({
            property,
            totalPages: Math.ceil(total / PAGE_SIZE)
        });
    } catch (e) {
        res.sendStatus(400).json(e);
    }
});

/**
 * Retrieve a single property
 */
router.get("/locate/:propertyId", async (req, res) => {
    try {
        const { propertyId } = req.params;
        const property = await Property.findById(propertyId);
        res.json(property);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * Retrieve information about the tenant
 */
router.get("/:ownerId/:propertyId", async (req, res) => {
    try {
        const { propertyId } = req.params;
        const property = await Property.findById(propertyId);
        const populate = await property.populate({ path: "tenant", select: { name: 1, email: 1, phoneNumber: 1 } });
        res.json(populate);
    } catch (e) {
        res.status(400).json(`Error: ${e}`);
    }
});

/**
 * Retrieve all property owned by landlord
 */
router.get("/:ownerId", async (req, res) => {
    try {
        const { ownerId } = req.params;
        const properties = await Property.find({ ownerId });
        const propertiesWithTenants = properties.filter((property) => (property.tenant !== undefined));
        propertiesWithTenants.map(async (property) => {
            const tenantCheckoutSession = await TenantCheckoutSessionModel.findOne({ tenantId: property.tenant });
            if (tenantCheckoutSession) {
                const { checkoutSessionId } = tenantCheckoutSession;
                const session = await stripe.checkout.sessions.retrieve(
                    checkoutSessionId
                );
                const { payment_status } = session;
                await Property.findOneAndUpdate({ tenant: property.tenant }, {
                    rent_payment_status: payment_status
                });
            }
        });
        const updatedProperties = await Property.find({ ownerId });
        res.json(updatedProperties);
    } catch (e) {
        res.status(400).json(`Error: ${e}`);
    }
});

/**
 * Add a tenant to a property
 */
router.post("/addTenant/:owner/:property", async (req, res) => {
    try {
        const { phoneNumber, name, email } = req.body;
        const { property } = req.params;
        const user = await User.User.findOne({ phoneNumber, name, email });
        const addTenant = await Property.findByIdAndUpdate(property, {
            tenant: user._id
        });
        res.json(addTenant);
    } catch (e) {
        res.status(400).json(`Error: ${e}`);
    }
});

/**
 * Delete a tenant from a property
 */
router.post("/deleteTenant/:owner/:propertyId", async (req, res) => {
    const { propertyId } = req.params;
    try {
        const property = await Property.findByIdAndUpdate(propertyId, { $unset: { tenant: 1 } });
        res.json(property);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * Add a property to the landlord's account
 */
router.post("/:id", async (req, res) => {
    try {
        const ownerId = req.params.id;
        const {
            location,
            built,
            squareFeet,
            rent,
            capacity,
            parkingStalls,
            pets,
            utilities,
            bed,
            bath,
            post,
            description,
            tenant,
            amenities,
            images
        } = req.body;
        // Check owner id is valid
        const owner = await User.User.findById(ownerId);
        const { userType } = owner;
        if (userType === "Landlord") {
            let result = [];
            for (let i = 0; i < images.length; i++) {
                const data = await cloudinary.uploader.upload(images[i], { folder: "properties" });
                result.push({
                    public_id: data.public_id,
                    secure_url: data.secure_url
                });
            }
            const price = await stripe.prices.create({
                unit_amount: rent * 100,
                currency: "usd",
                recurring: { interval: "month" },
                product_data: {
                    name: location,
                    metadata: {
                        ownerId,
                        location,
                        built,
                        squareFeet,
                        capacity,
                        parkingStalls,
                        pets,
                        utilities,
                        bed,
                        bath,
                        post,
                        description
                    }
                }
            });
            const newProperty = new Property({
                location,
                built,
                squareFeet,
                amenities,
                images: result,
                rent,
                capacity,
                parkingStalls,
                pets,
                utilities,
                bed,
                bath,
                post,
                description,
                ownerId,
                tenant,
                priceId: price.id
            });
            const createProperty = await newProperty.save();
            res.json(createProperty);
        } else {
            res.status(404).json({
                message: "owner does not exist"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

/**
 * Delete a property
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        const { images } = property;
        for (const image of images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        await property.remove();
        res.json(property);
    } catch (e) {
        console.log(e);
    }
});

/**
 * Update a landlord's property
 */
router.patch("/update/:ownerId/:id", async (req, res) => {
    try {
        const { id, ownerId } = req.params;
        //store new files
        const {
            location,
            built,
            squareFeet,
            amenities,
            rent,
            capacity,
            parkingStalls,
            pets,
            utilities,
            bed,
            bath,
            post,
            description,
            imagesToDelete,
            images
        } = req.body;
        const property = await Property.findById(id);
        //Find property by the id and update it
        if (property.priceId) {
            await stripe.prices.update(
                property.priceId,
                { active: false }
            );
            const updatePrice = await stripe.prices.create({
                unit_amount: rent * 100,
                currency: "usd",
                recurring: { interval: "month" },
                product_data: {
                    name: location,
                    metadata: {
                        ownerId,
                        location,
                        built,
                        squareFeet,
                        capacity,
                        parkingStalls,
                        pets,
                        utilities,
                        bed,
                        bath,
                        post,
                        description
                    }
                }
            });
            const priceId = updatePrice.id;
            const updatedProperty = await Property.findByIdAndUpdate(id, {
                location,
                built,
                squareFeet,
                images: await imageUploader(property.images, imagesToDelete, images),
                amenities,
                rent,
                capacity,
                parkingStalls,
                pets,
                utilities,
                bed,
                bath,
                post,
                description,
                priceId,
                ownerId
            });
            //return the updated property as json
            res.json(updatedProperty);
        } else {
            res.status(404).json({
                message: "priceId missing"
            });
        }
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;
