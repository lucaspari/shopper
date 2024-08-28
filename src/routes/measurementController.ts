import { Router, Request, Response } from "express";
import { MeasurementSchema } from "../types/measurement";
import Error from "../types/error";
import utils from "@/utils/utils";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    const { body, file } = req;

    if (!file || !utils.verifyImageBase64(file.encoding)) {
      const err: Error = {
        error_code: 400,
        error_description: "É necessário enviar uma imagem em base64",
      };
      return res.status(err.error_code).json(err.error_description);
    }

    try {
      MeasurementSchema.parse(body);
      return res.status(201).json(body);
    } catch (error) {
      console.log(body);
      const err: Error = {
        error_code: 400,
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      };
      return res.status(err.error_code).json(err.error_description);
    }
  }
);

export default router;
