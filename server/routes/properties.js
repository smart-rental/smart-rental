import Property from "../models/properties.model.js";
import User from "../models/user.model.js";
import { upload } from "../middleware/propertyImageHelper.js";
import express from "express";
import imageHelper from "../middleware/imageHelper.js";
import deleteImageHelper from "../middleware/deleteImageHelper.js";

const router = express.Router();

router.route('/').get(async (req, res) => {
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

router.route('/:id').get((req, res) => {
    Property.find({ ownerId: req.params.id })
        .then(Property.find({ ownerId: req.params.id })
            .populate({ path: "tenant", select: { name: 1, email: 1, phoneNumber: 1 } })
            .then((Property) => { res.json(Property)})
            .catch(err => res.status(400).json(`Error: ${err}`)))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/locate/:propertyId').get((req, res) => {
    const { propertyId } = req.params;
    Property.findById(propertyId)
        .then((Property) => { 
            res.json(Property);
        })
        .catch((e) => { 
            res.status(400).json(e);
        })
});

router.route('/:ownerId/:propertyId').get((req, res) => {
    Property.find({ ownerId: req.params.ownerId, _id: req.params.propertyId })
        .then(Property.findById(req.params.propertyId)
            .populate({ path: "tenant", select: { name: 1, email: 1, phoneNumber: 1 } })
            .then((Property) => { res.json(Property)})
            .catch(err => res.status(400).json(`Error: ${err}`)))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/addTenant/:owner/:property').post((req, res) => {
   const {phoneNumber, name, email} = req.body; 
   const {property} = req.params;
   User.User.findOne({ phoneNumber, name, email })
       .then(user => {
           if (user != null) {
               Property.findByIdAndUpdate(property, { tenant: user._id })
                   .then((Property) =>  {
                       res.json(Property);
                   }).catch(err => res.status(400).json(`Error: ${err}`));
           }
       })
       .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/deleteTenant/:owner/:property').post((req, res) => {
    Property.findByIdAndUpdate(req.params.property, { tenant: null })
        .then((Property) => { 
            res.json(Property);
        })
        .catch((e) => {
            console.log(e);
        });
    
});

router.route('/:id').post(upload.array("images", 7), (req, res) => {
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
        tenant
    });

    newProperty.save()
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    Property.findByIdAndDelete(id)
        .then(Property => res.json(`Property Deleted: ${Property._id}`))
        .catch(e => res.status(404).json(`Error: ${e}`));
});

router.route('/update/:ownerId/:id').post(upload.array("images", 7), (req, res) => {
    const { id, ownerId } = req.params;
    let fileArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
        }
        fileArray.push(file);
    });
    const { location, built, squareFeet, rent, capacity, parkingStalls, pets, utilities, bed, bath, post, description, indexToDelete } = req.body;
    Property.findByIdAndUpdate(id)
        .then(Property => {
            Property.location = location;
            Property.built = Date.parse(built);
            Property.squareFeet = Number(squareFeet);
            Property.images = indexToDelete == null ? imageHelper(fileArray, Property.images) : deleteImageHelper(Property.images, indexToDelete, fileArray);
            Property.rent = Number(rent);
            Property.capacity = Number(capacity);
            Property.parkingStalls = Number(parkingStalls);
            Property.pets = Boolean(pets);
            Property.utilities = utilities;
            Property.bed = bed;
            Property.bath = bath;
            Property.post = post;
            Property.description = description;
            Property.ownerId = ownerId;

            Property.save()
                .then(() => res.json(Property))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(e => res.status(400).json(`Error: ${e}`))
});

export default router;
