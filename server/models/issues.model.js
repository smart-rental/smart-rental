import mongoose from 'mongoose';

const issuesModel = mongoose.Schema({
    tenantId: { type: String, required: true },
    propertyId: { type: String, required: true },
    issueType: { type: String, required: true },
    issueImage: { type: String, required: true },
    issueDescription: { type: String, required: true },
    status: { type: String, required: true, default: "Requested" }
});

let Issue = mongoose.model('Issue', issuesModel);

export default Issue;