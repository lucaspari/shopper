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
export async function verifyIfMeasuredInCurrentMonth(
  data: any
): Promise<boolean> {
  const measure = await prisma.measure.findFirst({
    where: {
      AND: [
        { measure_type: data.measure_type },
        {
          measure_datetime: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      ],
    },
  });
  if (measure) {
    return true;
  } else return false;
}
