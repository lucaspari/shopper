import { app } from "@/app";
import MeasurementRepository from "./infra/dynamoose";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  MeasurementRepository.getInstance();
});
