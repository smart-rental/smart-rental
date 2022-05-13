import express from 'express';
import mongoose from "mongoose";
import cors from "cors";

import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import propertyRouter from './routes/properties.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/property', propertyRouter);
app.use("*", (req, res) => { res.status(404).json({ error: " Page Not found "})});

const CONNECTION_URL = "mongodb+srv://gavpeng:gavpeng7447@cluster0.vq4nk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
    console.log("MongoDB server has established a connection");
});

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
