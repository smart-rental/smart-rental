import Property from "../models/properties.model.js";
import User from "../models/user.model.js";
import { upload } from "../middleware/propertyImageHelper.js";
import express from "express";
import imageHelper from "../middleware/imageHelper.js";

const router = express.Router();

router.route('/').get((req, res) => {
    Property.find()
        .then((Property) => {
            res.json(Property); })
        .catch(e => res.status(400).json(`Error: ${e}`));
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
   const tenantPhoneNumber = req.body.phoneNumber;
   const tenantName = req.body.name;
   const tenantEmail = req.body.email;
   User.User.findOne({ phoneNumber: tenantPhoneNumber, name: tenantName, email: tenantEmail })
       .then(user => {
           if (user != null) {
               Property.findByIdAndUpdate(req.params.property, { tenant: user._id })
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

router.route('/:id').post(upload.array("propertyImage", 7), (req, res) => {
    const ownerId = req.params.id;
    let fileArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
        }
        fileArray.push(file);
    });
    const { location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, pets, utilities, tenant, contract } = req.body;
    const newProperty = new Property({
        location,
        propertyCreated,
        propertyValue,
        rentPerMonth,
        maxCapacity,
        propertyImage: fileArray,
        parkingStalls,
        pets,
        utilities,
        tenant,
        contract, 
        ownerId
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

router.route('/update/:ownerId/:id').post(upload.array("propertyImage", 7), (req, res) => {
    const { id, ownerId } = req.params;
    let fileArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
        }
        fileArray.push(file);
    });
    const { location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, indexToDelete, parkingStalls, pets, utilities, contract } = req.body;
    Property.findByIdAndUpdate(id)
        .then(Property => {
            Property.location = location;
            Property.propertyCreated = Date.parse(propertyCreated);
            Property.propertyValue = Number(propertyValue);
            Property.rentPerMonth = Number(rentPerMonth);
            Property.maxCapacity = Number(maxCapacity);
            Property.propertyImage = indexToDelete == null ? imageHelper(fileArray, Property.propertyImage) :  Property.propertyImage.filter((images, index) => !(indexToDelete.includes(index)));
            Property.pets = Boolean(pets);
            Property.parkingStalls = Number(parkingStalls);
            Property.utilities = utilities;
            Property.contract = contract;
            Property.ownerId = ownerId;

            Property.save()
                .then(() => res.json(Property))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(e => res.status(400).json(`Error: ${e}`))
});

export default router;
