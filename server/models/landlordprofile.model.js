import mongoose from 'mongoose';

const landlordProfileModel = mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    contracts: [
        { 
            imageURL: String,
        }
    ],
    properties: [
        { 
            location: String,
            propertyCreated: Date,
            propertyValue: String,
            rentPerMonth: Number,
        }
    ],
}, { timeStamp: true });

let LandLord = mongoose.model('landLordProfile', landlordProfileModel);

export default LandLord;