import mongoose from 'mongoose';

const propertiesModel = mongoose.Schema({
    location: { type: String, required: true },
    owner: { type: String, required: true },
    propertyCreated: { type: Date, required: true },
    propertyValue: { type: String, required: true },
    rentPerMonth: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    propertyImage: { type: String, required: true },
    parkingStalls: { type: Number, required: true },
    pets: { type: Boolean, required: true },
    utilities: { type: Boolean, required: true },
    contract: [
        {
            image: String
        }
    ], 
    ownerId: { type: String }
});

let Properties = mongoose.model('Properties', propertiesModel);

export default Properties;