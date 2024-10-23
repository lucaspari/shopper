import express, { Express, Router } from "express";
import dotenv from "dotenv";
import measurementController from "@/routes/measurementController";
import bodyParser from "body-parser";
dotenv.config();
const app: Express = express();
const router = Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/measurement/", new measurementController(router).router);

export { app };
