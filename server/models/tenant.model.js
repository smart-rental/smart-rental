import mongoose from 'mongoose';

const tenantModel = mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    creditCardInfo: { type: Number, required: true },
});

let Tenant = mongoose.model('Tenant', tenantModel);

export default Tenant;