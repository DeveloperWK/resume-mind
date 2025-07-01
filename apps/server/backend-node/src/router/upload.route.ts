import { Router } from "express";
import upload from "../config/multerConfig";
import { handleResumeUpload } from "../controller/uploadController";
const router = Router();

router.post("/upload-resume", upload.single("resume"), handleResumeUpload);
export default router;
