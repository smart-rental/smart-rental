import Tenant from "../models/tenant.model.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.route('/:id').get((req, res) => {
    Tenant.find({ _id: req.params.id })
        .then(Tenant => res.json(Tenant))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/').post((req, res) => {
    const { firstName, middleName, lastName, creditCardInfo } = req.body;
    const newTenant = new Tenant({
        firstName,
        middleName,
        lastName,
        creditCardInfo
    });

    newTenant.save()
        .then(Tenant => res.json(Tenant))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    Tenant.findByIdAndDelete(id)
        .then(Tenant => res.json(`Tenant Deleted: ${Tenant._id}`))
        .catch(e => res.status(404).json(`Error: ${e}`));
});

router.route('/update/:id').post((req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(404).send(`No post with id: ${id}`);
    const { firstName, middleName, lastName, creditCardInfo } = req.body;
    Tenant.findByIdAndUpdate(id)
        .then(Tenant => { 
            Tenant.firstName = firstName;
            Tenant.middleName = middleName;
            Tenant.lastName = lastName;
            Tenant.creditCardInfo = creditCardInfo;
            
            Tenant.save()
                .then(() => res.json(`Tenant successfully updated`))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(400).json(e));
});

export default router;
