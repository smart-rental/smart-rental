import Property from "../models/properties.model.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.route('/:id').get((req, res) => {
    Property.find({ ownerId: req.params.id })
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:id').post((req, res) => {
    const ownerId = req.params.id;
    const { location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, tenant, contract } = req.body;
    const newProperty = new Property({
        location,
        propertyCreated,
        propertyValue,
        rentPerMonth,
        maxCapacity,
        propertyImage,
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

router.route('/update/:ownerId/:id').post((req, res) => {
    const { id, ownerId } = req.params;
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
            Property.ownerId = ownerId;

            Property.save()
                .then(() => res.json(Property))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(e => res.status(404).json(`Error: ${e}`))
});

export default router;
