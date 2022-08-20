import mongoose from 'mongoose';

const issuesModel = mongoose.Schema({
    tenantId: { type: String, required: true },
    propertyId: { type: String, required: true },
    issueType: { type: String, required: true },
    issueImage: [Object],
    issueDescription: { type: String },
    status: { type: String, required: true, default: "Requested" },
    timeStamp: {type: Date, default: new Date(Date.now()).toDateString() }
});

let Issue = mongoose.model('Issue', issuesModel);

export default Issue;