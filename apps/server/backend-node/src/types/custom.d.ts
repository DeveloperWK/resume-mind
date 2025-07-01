import { Request } from "express";

interface MulterFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}
interface MulterRequest extends Request {
  file?: MulterFile;
}

export { MulterFile, MulterRequest };
