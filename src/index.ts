import express, { Express, Request, Response } from "express";
import HomeRouter from "./routes/home";
import dotenv from "dotenv";

const app: Express = express();

dotenv.config();

app.use("/", HomeRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
