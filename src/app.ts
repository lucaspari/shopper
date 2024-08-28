import express, { Express } from "express";
import dotenv from "dotenv";
import homeRoutes from "@/routes/home";
import measurementController from "@/routes/measurementController";
import bodyParser from "body-parser";
dotenv.config();
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/measurement/", measurementController);

export default app;
