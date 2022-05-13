import Property from "../models/properties.model.js";
import express from "express";

const router = express.Router();

router.route('/:owner').get((req, res) => {
    Property.find()
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/').post((req, res) => {
    const { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, tenant, contract } = req.body;
    const newProperty = new Property({
        location,
        owner,
        propertyCreated,
        propertyValue,
        rentPerMonth,
        maxCapacity,
        tenant,
        contract
    });

    newProperty.save()
        .then(Property => res.json(Property))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    Property.findByIdAndDelete(id)
        .then(Property => res.json(Property))
        .catch(e => res.status(404).json(`Error: ${e}`));
});

router.route('/update/:id').post((req, res) => {
    const { id } = req.params;
    const { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, tenant, contract } = req.body;
    Property.findByIdAndUpdate(id)
        .then(Property => {
            Property.location = location;
            Property.owner = owner;
            Property.propertyCreated = Date.parse(propertyCreated);
            Property.propertyValue = Number(propertyValue);
            Property.rentPerMonth = Number(rentPerMonth);
            Property.maxCapacity = Number(maxCapacity);
            Property.tenant = tenant;
            Property.contract = contract;

            Property.save()
                .then(() => res.json('Property updated'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(e => res.status(404).json(`Error: ${e}`))
});

export default router;
