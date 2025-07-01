import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import uploadRoutes from "../src/router/upload.route";

configDotenv();
const APP = express();
APP.use(express.json()).use(morgan("dev"));

APP.use("/api/v1/upload", uploadRoutes);

export default APP;
