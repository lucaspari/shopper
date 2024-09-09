import { app } from "@/app";
import MeasurementRepository from "./infra/dynamoose";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  const instance = MeasurementRepository.getInstance();
  // const data = {
  //   id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  //   customer_code: "CUST1234",
  //   measure: 567,
  //   measure_type: "ELECTRICITY",
  // };
  // instance.connect();
  // instance.create(data);
  instance.list().then((data) => console.log(data));
});
