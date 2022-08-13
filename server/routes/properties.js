import Property from "../models/properties.model.js";
import User from "../models/user.model.js";
import { upload } from "../middleware/propertyImageHelper.js";
import express from "express";
import imageHelper from "../middleware/imageHelper.js";
import deleteImageHelper from "../middleware/deleteImageHelper.js";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51LAq93DVsFX5e9sJojJMIflKiw2CKP82HnyA9VxRKvuOVQ1dioE2UEKi6rBVPYefFmdWCrMG81PYs6SGHtqiPBWo00aPOfzEyN', {
    apiVersion: "2020-08-27"
});

const router = express.Router();

/**
 * Retrieve properties with given pagination
 */
router.get('/', async (req, res) => {
    try {
        const PAGE_SIZE = 10;
        const page = parseInt(req.query.page || "0");
        const total = await Property.countDocuments({post: true});
        const property = await Property.find({ post: true })
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page)
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
router.get('/locate/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;
        const property = Property.findById(propertyId);
        res.json(property);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * Retrieve information about the tenant
 */
router.get('/:ownerId/:propertyId', async (req, res) => {
    try {
        const {propertyId} = req.params;
        const property = await Property.findById(propertyId);
        const populate = await property.populate({ path: "tenant", select: { name: 1, email: 1, phoneNumber: 1 }})
        res.json(populate);
    } catch (e) {
        res.status(400).json(`Error: ${e}`)
    }
});

/**
 * Add a tenant to a property
 */
router.post('/addTenant/:owner/:property', async (req, res) => {
    try {
        const {phoneNumber, name, email} = req.body;
        const {property} = req.params;
        const user = await User.User.findOne({phoneNumber, name, email});
        const addTenant = await Property.findByIdAndUpdate(property, {
            tenant: user._id
        });
        res.json(addTenant);
    } catch (e) {
        res.status(400).json(`Error: ${e}`)
    }
});

/**
 * Delete a tenant from a property
 */
router.post('/deleteTenant/:owner/:property', (req, res) => {
    Property.findByIdAndUpdate(req.params.property, { $unset: {tenant: 1} })
        .then((Property) => { 
            res.json(Property);
        })
        .catch((e) => {
            console.log(e);
        });
    
});

/**
 * Add a property to the landlord's account
 */
router.post('/:id', upload.array("images", 7), async (req, res) => {
    try {
        const ownerId = req.params.id;
        let images = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
            }
            images.push(file);
        });
        const { location, built, squareFeet, rent, capacity, parkingStalls, pets, utilities, bed, bath, post, description, tenant } = req.body;
        const price = await stripe.prices.create({
            unit_amount: rent * 100,
            currency: 'usd',
            recurring: {interval: 'month'},
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
            },
        });
        const newProperty = new Property({
            location,
            built,
            squareFeet,
            images,
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
    } catch(e) {
        console.log(e);
    }
});

/**
 * Delete a property
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);
        res.json(deletedProperty);
    } catch (e) {
        console.log(e);
    }
});

/**
 * Update a landlord's property
 */
router.patch('/update/:ownerId/:id', upload.array('images', 7), async (req, res) => {
    try {
        const { id, ownerId } = req.params;
        //store new files
        let fileArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
            }
            fileArray.push(file);
        });
        const { location, built, squareFeet, rent, capacity, parkingStalls, pets, utilities, bed, bath, post, description, indexToDelete, priceId } = req.body;
        const property = await Property.findById(id);
        //Find property by the id and update it
        const updatedProperty = await Property.findByIdAndUpdate(id, {
            location,
            built,
            squareFeet,
            images: indexToDelete == null ? imageHelper(fileArray, property.images) : deleteImageHelper(property.images, indexToDelete, fileArray),
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
        })
        //return the updated property as json
        res.json(updatedProperty);
    } catch(e) {
        console.log(e);
    }
});

export default router;
