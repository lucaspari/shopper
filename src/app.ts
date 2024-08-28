import express, { Express } from "express";
import dotenv from "dotenv";
import homeRoutes from "@/routes/home";
import measurementController from "@/routes/measurementController";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use("/", homeRoutes);
app.use("measurement/", measurementController);

export default app;
