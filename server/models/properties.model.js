import mongoose from 'mongoose';
import User from "./user.model.js";

const propertiesModel = mongoose.Schema({
    location: { type: String, required: true },
    propertyCreated: { type: Date, required: true },
    propertyValue: { type: Number, required: true },
    rentPerMonth: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    propertyImage: [Object],
    parkingStalls: { type: Number, required: true },
    pets: { type: Boolean, required: true },
    utilities: { type: String, required: true },
    contract: {
        type: String,
        required: true
    },
    ownerId: { type: String, required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: User.User }
});

let Properties = mongoose.model('Properties', propertiesModel);

export default Properties;