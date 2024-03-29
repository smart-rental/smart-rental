import { User } from '../models/user.model.js';
import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

router.get("/", async (req, res) => { 
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get("/:ownerId", async(req, res) => {
    try {
        const {ownerId} = req.params;
        const userInfo = await User.findById(ownerId);
        res.json(userInfo);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: req.body });
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