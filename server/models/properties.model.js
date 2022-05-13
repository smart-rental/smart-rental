import mongoose from 'mongoose';

const propertiesModel = mongoose.Schema({
    location: { type: String, required: true },
    owner: { type: String, required: true },
    propertyCreated: { type: Date, required: true },
    propertyValue: { type: String, required: true },
    rentPerMonth: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    tenant: { type: String, default: "" },
    contract: [
        {
            image: String
        }
    ]
});

let Properties = mongoose.model('Properties', propertiesModel);

export default Properties;