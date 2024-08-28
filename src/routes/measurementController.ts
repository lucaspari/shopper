import { Router, Request, Response } from "express";
import { MeasurementSchema } from "../types/measument";
import Error from "../types/error";
const router = Router();

router.post("/upload", (req: Request, res: Response) => {
  const measurement = req.body;
  console.log(measurement);

  try {
    MeasurementSchema.parse(measurement);
  } catch (error) {
    const err: Error = {
      error_code: 400,
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    };
    return res.status(err.error_code).json(err.error_description);
  }
});

export default router;
