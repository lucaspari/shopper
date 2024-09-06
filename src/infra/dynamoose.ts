import * as dynamoose from "dynamoose";

dynamoose.aws.ddb.local("http://localhost:8000");

const measurementSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true, // This is the primary key
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
    default: () => new Date(), // Default to current time
  },
  measure_type: {
    type: String,
    enum: ["WATER", "ELECTRICITY", "GAS"], // Example enum values
    default: "WATER",
  },
});

// Create the model
const Measurement = dynamoose.model("measurements-table", measurementSchema);

// Example: Create a new measurement entry
const newMeasurement = new Measurement({
  id: "MEAS123",
  customer_code: "CUST123",
  measure: 25.5,
  measure_type: "WATER",
});

newMeasurement
  .save()
  .then(() => console.log("New measurement saved!"))
  .catch((error) => console.error("Error saving measurement:", error));

Measurement.get("MEAS123").then((measurement) => {
  console.log("Found measurement:", measurement);
});
