import express from 'express';
import { User, validate } from '../models/user.model.js';
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });

    } catch(e) {
        res.status(500).send({ error: e.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, password } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(password, salt);
            const user = await User.findByIdAndUpdate(id, {
                name,
                email,
                phoneNumber,
                password: hashPassword
            });
            res.status(201).send({ message: "User profile updated successfully", user });
        } else {
            const user = await User.findByIdAndUpdate(id, {
                name,
                email,
                phoneNumber,
            });
            res.status(201).send({ message: "User profile updated successfully", user });
        }
    } catch(e) {
        res.status(500).send({ error: e.message });
    }
});

export default router;