import { Router, Request, Response } from "express";
import { MeasurementSchema } from "@/types/measurement";
import Error from "@/types/error";
import utils from "@/utils/utils";
import multer from "multer";
import MeasurementRepository from "@/infra/dynamoose";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), handleUpload);
router.get("/", handleList);
const instance = MeasurementRepository.getInstance();
function handleUpload(req: Request, res: Response) {
  const { body, file } = req;

  if (!file || !utils.verifyIfIsImage(file)) {
    const error: Error = {
      error_description: "Nenhum arquivo foi enviado",
      error_code: "NO_FILE",
    };
    return res.status(400).json(error);
  }

  utils
    .readingGeminiResult(file?.path)
    .then((result) => {
      MeasurementSchema.parse(body);
      const measure = utils.getNumberInsideString(result);
      instance.create({ ...body, measure });
      return res.json({ message: "Medição enviada com sucesso" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error_description: "Internal Server Error" });
    });
}
function handleList(req: Request, res: Response) {
  instance.list().then((data) => {
    return res.json(data);
  });
}

export default router;
