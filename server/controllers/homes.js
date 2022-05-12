import express, { request, response } from "express";
import mongoose from 'mongoose';

import user from '../models/UserSchema.js';

const router = express.Router();

export const getUser = async (request, response) => { 
    try { 
        const user = await user.find();
        response.status(200).json({ user });
    } catch(e) { 
        response.status(404).json({ message: e.message });
    }
}

export default router;