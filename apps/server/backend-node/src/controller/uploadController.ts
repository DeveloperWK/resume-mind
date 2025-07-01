import { Response } from "express";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import { MulterFile, MulterRequest } from "../types/custom";
import extractSkillsFromText from "../utils/extractSkillsFromText";
const uploadResumeFile = (req: MulterRequest, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  res.status(200).json({
    message: "File Upload successfully",
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    bufferLength: req.file.buffer.length,
  });
};

const extractResumeText = async (file: MulterFile): Promise<string> => {
  const mimeType = file.mimetype;
  if (mimeType === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text;
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  } else {
    throw new Error("Unsupported file type");
  }
};
const extractSkillsFromResume = (resumeText: string): string[] => {
  return extractSkillsFromText(resumeText);
};

const handleResumeUpload = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No resume file uploaded" });
      return;
    }
    const resumeText = await extractResumeText(file);
    const extractedSkills = extractSkillsFromResume(resumeText);
    res.status(200).json({
      resumeText,
      extractedSkills,
    });
  } catch (err) {
    console.error("Resume processing failed:", err);
    res.status(500).json({ error: "Failed to process resume file." });
  }
};
export { handleResumeUpload, uploadResumeFile };
