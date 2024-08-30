import { prisma } from "@/infra/prisma";
export async function getByMeasurementId(measurementId: string) {
  return await prisma.measure.findUnique({
    where: { id: measurementId },
  });
}
export async function createMeasurement(data: any) {
  return await prisma.measure.create({
    data,
  });
}
