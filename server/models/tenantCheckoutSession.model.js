import mongoose from "mongoose";

const tenantCheckoutSessionModel = mongoose.Schema({
    tenantId: { type: String, required: true },
    checkoutSessionId: { type: String }
}, { timeStamp: true });

export const TenantCheckoutSessionModel = mongoose.model('TenantCheckoutSession', tenantCheckoutSessionModel);

export default TenantCheckoutSessionModel;