import Property from "../models/properties.model.js";
import express from "express";
import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;

const router = express.Router();

router.route('/:owner').get((req, res) => {
    Property.find({ owner: req.params.owner })
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/').post((req, res) => {
    const { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, tenant, contract } = req.body;
    const newProperty = new Property({
        location,
        owner,
        propertyCreated,
        propertyValue,
        rentPerMonth,
        maxCapacity,
        propertyImage,
        parkingStalls,
        pets,
        utilities,
        tenant,
        contract
    });

    newProperty.save()
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:owner/:id').delete((req, res) => {
    const { id } = req.params;
    Property.findByIdAndDelete(id)
        .then(Property => res.json(`Property Deleted: ${Property._id}`))
        .catch(e => res.status(404).json(`Error: ${e}`));
});

router.route('/update/:owner/:id').post((req, res) => {
    const { id } = req.params;
    const { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, tenant, contract } = req.body;
    Property.findByIdAndUpdate(id)
        .then(Property => {
            Property.location = location;
            Property.owner = owner;
            Property.propertyCreated = Date.parse(propertyCreated);
            Property.propertyValue = Number(propertyValue);
            Property.rentPerMonth = Number(rentPerMonth);
            Property.maxCapacity = Number(maxCapacity);
            Property.propertyImage = propertyImage;
            Property.tenant = tenant;
            Property.pets = Boolean(pets);
            Property.parkingStalls = Number(parkingStalls);
            Property.utilities = Boolean(utilities);
            Property.contract = contract;

            Property.save()
                .then(() => res.json('Property updated' + Property))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(e => res.status(404).json(`Error: ${e}`))
});

export default router;
