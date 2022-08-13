import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    stripe_account: { type: String }
}, { timeStamp: true });

userModel.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, "test", { expiresIn: "7d" })
}

export let User = mongoose.model('Users', userModel);

export const validate = (data) => { 
    const schema = joi.object({
        name: joi.string().required().label("name"),
        email: joi.string().required().email({ tlds: { allow: true } }),
        phoneNumber: joi.number().required().label("phoneNumber"),
        password: passwordComplexity().required().label("password"),
        userType: joi.string().required().label("usertype"),
    });
    return schema.validate(data);
}
export default { User, validate };