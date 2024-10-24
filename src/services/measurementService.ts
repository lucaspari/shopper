import MeasurementRepository from "@/infra/dynamoose";
import { Measurement } from "@/types/measurement";

class MeasurementService {
  measurementRepository: MeasurementRepository;

  constructor(measurementRepository: MeasurementRepository) {
    this.measurementRepository = measurementRepository;
  }

  createMeasurement(measure: Measurement) {
    return this.measurementRepository.create(measure);
  }
  deleteMeasurement(id: string) {
    return this.measurementRepository.delete(id);
  }
}

export default MeasurementService;
