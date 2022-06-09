import { User } from '../models/user.model.js';
import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

router.get("/", (req, res) => { 
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json(e));
});

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().label("email"),
        password: Joi.string().required().label("password"),
    });
    return schema.validate(data);
};

export default router;