import mongoose from 'mongoose';

const appliedApplicationsModel = mongoose.Schema({
    propertyId: { type: String, required: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    occupation: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    monthlyIncome: {type: Number, required: true},
    animals: {type: Number, required: true},
    vehicles: {type: Number, required: true},
    occupants: {type: Number, required: true},
    dob: {type: Date, required: true},
    message: {type: String },
    timeStamp: {type: Date, default: new Date(Date.now()).toDateString() }
});

let AppliedApplications = mongoose.model('AppliedApplications', appliedApplicationsModel);

export default AppliedApplications;