import * as dynamoose from "dynamoose";
import { measurementSchemaDynamoose } from "@/types/measurement";

dynamoose.aws.ddb.local("http://localhost:8000");

const Measurement = dynamoose.model(
  "measurements-table",
  measurementSchemaDynamoose
);

class MeasurementRepository {
  private static instance: MeasurementRepository;
  private connection: any;

  private constructor() {}

  public static getInstance(): MeasurementRepository {
    if (!MeasurementRepository.instance) {
      MeasurementRepository.instance = new MeasurementRepository();
    }
    return MeasurementRepository.instance;
  }

  public async connect() {
    this.connection = Measurement;
  }

  public async create(measurement: any) {
    return Measurement.create(measurement);
  }

  public async list() {
    return Measurement.scan().exec();
  }
}

export default MeasurementRepository;
