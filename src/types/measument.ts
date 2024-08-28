import { z } from "zod";

const MeasurementSchema = z.object({
  image: z.string(),
  customer_code: z.string(),
  measure_datetime: z.date(),
  measure_type: z.enum(["WATER", "GAS"]),
});

type Measurement = z.infer<typeof MeasurementSchema>;
export { Measurement, MeasurementSchema };
