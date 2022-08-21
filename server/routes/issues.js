import Issue from "../models/issues.model.js";
import Property from "../models/properties.model.js";
import express from "express";
import cloudinary from "../utils/Cloudinary.js";
import imageUploader from "../middleware/imageUploader.js";

const router = express.Router();

//retrieve all issues
router.get("/", async (req, res) => {
    try {
        const issue = await Issue.find();
        res.json(issue);
    } catch (e) { 
        res.status(400).json(e);
    }
});

//retrieve all tenant issues
router.get("/:tenantId", async (req, res) => {
    const { tenantId } = req.params;
    try {
        const issue = await Issue.find({ tenantId });
        res.json(issue);
    } catch (e) { 
        res.status(400).json(e);
    }
});

//retrieve information about one issue
router.get("/oneIssue/:issueId", async (req, res) => {
    const { issueId } = req.params;
    try {
        const issue = await Issue.findById(issueId);
        res.json(issue);
    } catch (e) { 
        res.status(400).json(e);
    }
});

//retrieve all issues associated with a property
router.get("/property/:propertyId", async (req, res) => {
    const { propertyId } = req.params;
    try {
        const issue = await Issue.find({propertyId});
        res.json(issue);
    } catch (e) { 
        res.status(400).json(e);
    }
});

//create a new issue
router.post("/:tenantId", async (req, res) => {
    const { tenantId } = req.params;
    const { issueType, issueDescription, issueImage } = req.body;
    try {
        const property = await Property.findOne({tenant: tenantId});
        let result = [];
        for (const image of issueImage) {
            const imageData = await cloudinary.uploader.upload(image, {folder: "issues"});
            result.push({
                public_id: imageData.public_id,
                secure_url: imageData.secure_url
            })
        }
        const newIssue = new Issue({
            tenantId,
            propertyId: property._id,
            issueImage: result,
            issueType,
            issueDescription
        });
        const createIssue = await newIssue.save();
        res.json(createIssue);
    } catch (e) {
        res.status(404).json("Error: user does not belong to a property");
    }
});

//Delete an issue and it's images in cloudinary
router.delete("/:tenantId/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await Issue.findById(id);
        const { issueImage } = issue;
        for (const image of issueImage) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        await issue.remove();
        res.json(issue);
    } catch (e) {
        res.status(404).json(e);
    }
});

//update issue image
router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { propertyId, issueType, issueDescription, imagesToDelete, issueImage, status } = req.body;
    try {
        const issue = await Issue.findById(id);
        const updatedIssue = await Issue.findByIdAndUpdate(id, {
            propertyId,
            issueType,
            issueImage: await imageUploader(issue.issueImage, imagesToDelete, issueImage),
            issueDescription,
            status
        });
        res.json(updatedIssue);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
