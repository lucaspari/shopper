import { Router, Request, Response } from "express";
import { MeasurementSchema } from "@/types/measurement";
import Error from "@/types/error";
import utils from "@/utils/utils";
import multer from "multer";
import MeasurementRepository from "@/infra/dynamoose";
import MeasurementService from "@/services/measurementService";

const upload = multer({ dest: "uploads/" });
const instance = MeasurementRepository.getInstance();
const measurementService = new MeasurementService(instance);

class MeasurementController {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/upload", upload.single("image"), this.handleUpload);
    this.router.delete("/:id", this.handleDelete);
    this.router.get("/", this.handleList);
  }
  private async handleDelete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await measurementService.deleteMeasurement(id);
      return res.status(200).json({ message: "Medição deletada com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ error_description: "Internal Server Error" });
    }
  }

  private async handleUpload(req: Request, res: Response) {
    const { body, file } = req;

    if (!file || !utils.verifyIfIsImage(file)) {
      const error: Error = {
        error_description: "Nenhum arquivo foi enviado",
        error_code: "NO_FILE",
      };
      return res.status(400).json(error);
    }

    try {
      const result = await utils.readingGeminiResult(file.path);
      MeasurementSchema.parse(body);
      const measure = utils.getNumberInsideString(result);
      await measurementService.createMeasurement({ ...body, measure });
      return res.json({
        message: "Medição enviada com sucesso",
        data: { ...body, measure },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error_description: "Internal Server Error" });
    }
  }

  private async handleList(req: Request, res: Response) {
    try {
      const data = await instance.list();
      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ error_description: "Internal Server Error" });
    }
  }
}

export default MeasurementController;
