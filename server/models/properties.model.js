import mongoose from 'mongoose';
import User from "./user.model.js";

const propertiesModel = mongoose.Schema({
    location: { type: String, required: true },
    built: { type: Date, required: true },
    squareFeet: { type: Number, required: true },
    images: [Object],
    rent: { type: Number, required: true },
    capacity: { type: Number, required: true },
    parkingStalls: { type: Number, required: true },
    pets: { type: Boolean, required: true },
    utilities: { type: String, required: true },
    bed: { type: Number, required: true },
    bath: { type: Number, required: true },
    post: { type: Boolean, required: true },
    description: { type: String },
    priceId: {type: String},
    ownerId: { type: String, required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: User.User }
});

let Properties = mongoose.model('Properties', propertiesModel);

export default Properties;