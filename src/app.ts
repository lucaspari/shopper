import express, { Express } from "express";
import dotenv from "dotenv";
import homeRoutes from "./routes/home";

dotenv.config();

const app: Express = express();

app.use("/", homeRoutes);

export default app;
