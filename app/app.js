import path from 'path';
import dotenv from 'dotenv/config';

import cors from 'cors';
import express from 'express';
import sequelize from 'sequelize';
import bodyParser from 'body-parser';

import { db } from './config/db.js';
import { routes } from './routes/index.js'

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000

db.authenticate()
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((error) => {
        console.log(process.env)
        console.log("Could not connect to the database!\n", error);
        process.exit();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
