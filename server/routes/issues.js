import Issue from "../models/issues.model.js";
import Property from "../models/properties.model.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.route('/').get((req, res) => {
    Issue.find()
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:tenantId').get((req, res) => {
    Issue.find({ tenantId: req.params.tenantId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/oneIssue/:issueId').get((req, res) => {
    const { issueId } = req.params;
    Issue.findById(issueId)
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/property/:propertyId').get((req, res) => {
    const { propertyId } = req.params;
    Issue.find({ propertyId })
        .then(Issue => res.json(Issue))
        .catch(e => res.status(400).json(`Error: ${e}`));
});

router.route('/:tenantId').post((req, res) => {
    const { tenantId } = req.params;
    const { issueType, issueImage, issueDescription } = req.body;
    Property.findOne({tenant: tenantId})
        .then((Property) => {
            const newIssue = new Issue({
                tenantId,
                propertyId: Property._id,
                issueType,
                issueImage,
                issueDescription,
            });
            newIssue.save()
                .then(Issue => res.json(Issue))
                .catch(e => res.status(400).json(`Error: ${e}`));
        })
        .catch(() => {
            res.status(404).json("Error: user does not belong to a property");});
});

router.route('/:tenantId/:id').delete((req, res) => {
    const { id } = req.params;
    
    Issue.findByIdAndDelete(id)
        .then(Issue => {
            res.json(`Issue Deleted: ${Issue._id}`);
        })
        .catch(e => res.status(404).json(e));
});

router.route('/update/:id').patch((req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    const { propertyId ,issueType, issueImage, issueDescription, status } = req.body;
    Issue.findByIdAndUpdate(id)
        .then(Issue => {
            Issue.propertyId = propertyId;
            Issue.issueType = issueType;
            Issue.issueImage = issueImage;
            Issue.issueDescription = issueDescription;
            Issue.status = status;

            Issue.save()
                .then(() => res.json(Issue))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(400).json(e));
});

export default router;
