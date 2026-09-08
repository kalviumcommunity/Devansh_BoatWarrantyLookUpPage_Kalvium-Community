import { NextResponse } from "next/server";
import { getProductBySerial, getRepairRecord, updateRepairRecord } from "@/lib/db";
import {
  validateSerialNumber,
  validateServiceCenterCode,
  parseRepairDate,
} from "@/utils/validation";
import { ValidationError, NotFoundError, handleApiError } from "@/utils/errors";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const existing = await getRepairRecord(id);
    if (!existing) {
      throw new NotFoundError("Repair record not found");
    }

    const body = await request.json();
    const serialNumber = body.serialNumber?.trim().toUpperCase();
    const repairDate = parseRepairDate(body.repairDate);
    const issueDescription = body.issueDescription?.trim();
    const serviceCenterCode = body.serviceCenterCode?.trim().toUpperCase();

    if (!validateSerialNumber(serialNumber)) {
      throw new ValidationError("A valid serial number is required");
    }
    if (!repairDate) {
      throw new ValidationError("A valid repair date is required");
    }
    if (!issueDescription) {
      throw new ValidationError("An issue description is required");
    }
    if (!validateServiceCenterCode(serviceCenterCode)) {
      throw new ValidationError("A valid service-center code is required");
    }

    const product = await getProductBySerial(serialNumber);
    if (!product) {
      throw new NotFoundError(
        "No registered product matches that serial number",
      );
    }

    const record = await updateRepairRecord(id, {
      serialNumber,
      repairDate,
      issueDescription,
      serviceCenterCode,
    });

    return NextResponse.json(record);
  } catch (error) {
    return handleApiError(error);
  }
}
