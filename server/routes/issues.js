import Issue from "../models/issues.model.js";
import Property from "../models/properties.model.js";
import express from "express";
import mongoose from "mongoose";
import { upload } from "../middleware/issueImageHelper.js";
import imageHelper from "../middleware/imageHelper.js";
import deleteImageHelper from "../middleware/deleteImageHelper.js";

const router = express.Router();

router.route("/").get((req, res) => {
    Issue.find()
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route("/:tenantId").get((req, res) => {
    Issue.find({ tenantId: req.params.tenantId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route("/oneIssue/:issueId").get((req, res) => {
    const { issueId } = req.params;
    Issue.findById(issueId)
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route("/property/:propertyId").get((req, res) => {
    const { propertyId } = req.params;
    Issue.find({ propertyId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route("/:tenantId").post(upload.array("issueImage", 5), (req, res) => {
    const { tenantId } = req.params;
    let fileArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path
        };
        fileArray.push(file);
    });
    const { issueType, issueDescription } = req.body;
    Property.findOne({ tenant: tenantId })
        .then((Property) => {
            const newIssue = new Issue({
                tenantId,
                propertyId: Property._id,
                issueImage: fileArray,
                issueType,
                issueDescription
            });
            newIssue.save()
                .then(Issue => res.json(Issue))
                .catch(e => res.status(400).json(`Error: ${e}`));
        })
        .catch(() => {
            res.status(404).json("Error: user does not belong to a property");
        });
});

router.route("/:tenantId/:id").delete((req, res) => {
    const { id } = req.params;

    Issue.findByIdAndDelete(id)
        .then(Issue => {
            res.json(`Issue Deleted: ${Issue._id}`);
        })
        .catch(e => res.status(404).json(e));
});

router.route("/update/:id").patch(upload.array("issueImage", 5), (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    let fileArray = [];
    if (req.files) {
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path
            };
            fileArray.push(file);
        });
    }
    const { propertyId, issueType, issueDescription, indexToDelete, status } = req.body;
    Issue.findByIdAndUpdate(id)
        .then(Issue => {
            Issue.propertyId = propertyId;
            Issue.issueType = issueType;
            Issue.issueImage = indexToDelete == null ? imageHelper(fileArray, Issue.issueImage) :  deleteImageHelper(Issue.issueImage, indexToDelete, fileArray);
            Issue.issueDescription = issueDescription;
            Issue.status = status;
            
            Issue.save()
                .then(() => res.json(Issue))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(400).json(e));
});

export default router;
