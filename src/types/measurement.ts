import { z } from "zod";
import * as dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
const MeasurementSchema = z.object({
  customer_code: z.string(),
  measure_type: z.enum(["WATER", "GAS"]),
});
const measurementSchemaDynamoose = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: () => uuidv4(),
  },
  customer_code: {
    type: String,
    required: true,
  },
  measure: {
    type: Number,
    required: true,
  },
  measure_datetime: {
    type: Date,
    default: () => new Date(),
  },
  measure_type: {
    type: String,
    enum: ["WATER", "ELECTRICITY", "GAS"],
  },
});

type Measurement = z.infer<typeof MeasurementSchema>;
export { Measurement, MeasurementSchema, measurementSchemaDynamoose };
