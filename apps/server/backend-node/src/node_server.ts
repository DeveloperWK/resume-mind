import { configDotenv } from "dotenv";
import express from "express";
configDotenv();
const app = express();
app.use(express.json());
const PORT = process.env._PORT || 5000;
app.listen(PORT, () => console.log(`Node server running on port ${PORT}`));
