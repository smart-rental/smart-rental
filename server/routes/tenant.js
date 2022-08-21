import Tenant from "../models/tenant.model.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tenant = await Tenant.findById(id);
        res.json(tenant);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/', async (req, res) => {
    const { firstName, middleName, lastName, creditCardInfo } = req.body;
    try {
        const newTenant = new Tenant({
            firstName,
            middleName,
            lastName,
            creditCardInfo
        });
        const tenant = await newTenant.save();
        res.json(tenant);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTenant = await Tenant.findByIdAndDelete(id);
        res.json(deletedTenant);
        
    } catch (e) {
        res.status(404).json(`Error: ${e}`);
    }
});

router.post('/update/:id', async (req, res) => {
    const { firstName, middleName, lastName, creditCardInfo } = req.body;
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).send(`No post with id: ${id}`);
        }
        const updatedTenant = await Tenant.findByIdAndUpdate(id, {
            firstName,
            middleName,
            lastName,
            creditCardInfo
        });
        res.json(updatedTenant);
    } catch (e) {
        res.status(400).json(e)
    }
});

export default router;
