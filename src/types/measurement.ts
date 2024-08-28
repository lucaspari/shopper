import { z } from "zod";

const MeasurementSchema = z.object({
  customer_code: z.string(),
  measure_datetime: z.string().date(),
  measure_type: z.enum(["WATER", "GAS"]).default("WATER"),
});

type Measurement = z.infer<typeof MeasurementSchema>;
export { Measurement, MeasurementSchema };
