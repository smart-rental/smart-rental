import Issue from "../models/issues.model.js";
import Property from "../models/properties.model.js";
import express from "express";
import { upload } from "../middleware/issueImageHelper.js";
import cloudinary from "../utils/Cloudinary.js";
import imageUploader from "../middleware/imageUploader.js";

const router = express.Router();

//retrieve all issues
router.route("/").get((req, res) => {
    Issue.find()
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

//retrieve all tenant issues
router.route("/:tenantId").get((req, res) => {
    Issue.find({ tenantId: req.params.tenantId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

//retrieve information about one issue
router.route("/oneIssue/:issueId").get((req, res) => {
    const { issueId } = req.params;
    Issue.findById(issueId)
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

//retrieve all issues associated with a property
router.route("/property/:propertyId").get((req, res) => {
    const { propertyId } = req.params;
    Issue.find({ propertyId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

//create a new issue
router.post("/:tenantId", upload.array("issueImage", 5), async (req, res) => {
    const { tenantId } = req.params;
    const { issueType, issueDescription } = req.body;
    try {
        let result = []; 
        for (const image of req.files) { 
            const imageData = await cloudinary.uploader.upload(image.path, {folder: "issues"});
            result.push({
                public_id: imageData.public_id,
                secure_url: imageData.secure_url
            })
        }
        const property = await Property.findOne({tenant: tenantId});
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
        console.log(e);
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
router.patch("/update/:id", upload.array("issueImage", 5), async (req, res) => {
    const { id } = req.params;
    const { propertyId, issueType, issueDescription, indexToDelete, status } = req.body;
    try {
        const issue = await Issue.findById(id);
        const updatedIssue = await Issue.findByIdAndUpdate(id, {
            propertyId,
            issueType,
            issueImage: await imageUploader(issue.issueImage, indexToDelete, req.files),
            issueDescription,
            status
        });
        res.json(updatedIssue);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
