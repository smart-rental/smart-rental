import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import issueRouter from './routes/issues.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import propertyRouter from './routes/properties.js';
import tenantRouter from './routes/tenant.js';
import applicationRouter from './routes/applications.js';
import connectRouter from './routes/account.js';
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/property', propertyRouter);
app.use('/api/issue', issueRouter);
app.use('/api/tenant', tenantRouter);
app.use('/api/application', applicationRouter);
app.use('/api/connect', connectRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("*", (req, res) => { res.status(404).json({ error: " Page Not found "})});

const CONNECTION_URL = process.env.MONGOOSE_CONNECTION;
const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
    console.log("MongoDB server has established a connection");
});

if (process.env.NODE_ENV === "production") { 
    app.use(express.static('client/build'));
}

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
