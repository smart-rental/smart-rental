import AppliedApplications from "../models/appliedApplications.js";
import express from "express";

const router = express.Router();

router.route("/:propertyId").get(async (req, res) => { 
    try {
        const { propertyId } = req.params;
        const applications = await AppliedApplications.find({ propertyId });
        res.json(applications);
    } catch (e) {
        res.send(400).json({error: e});
    }
});

router.route("/apply/:propertyId").post(async (req, res) => {
    try {
        const {propertyId} = req.params;
        const {name, email, message, occupation, phoneNumber, monthlyIncome, animals, vehicles, occupants, dob} = req.body;
        const application = new AppliedApplications({
            propertyId,
            name,
            email,
            occupation,
            phoneNumber,
            monthlyIncome,
            animals,
            vehicles,
            occupants,
            dob,
            message
        });
        await application.save();
        res.json(application);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.route("/delete/:id").delete(async (req, res) => { 
   try {
       const {id} = req.params;
       await AppliedApplications.findByIdAndRemove(id);
       res.json({removed: true});
   } catch (e) { 
       res.status(400).json(e); 
   }
});

export default router;