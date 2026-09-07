import { NextResponse } from "next/server";
import { getProductBySerial, createRepairRecord } from "@/lib/db";
import { getRequestUser } from "@/lib/auth";
import {
  validateSerialNumber,
  validateServiceCenterCode,
  parseRepairDate,
} from "@/utils/validation";
import { ValidationError, NotFoundError, handleApiError } from "@/utils/errors";

export async function POST(request) {
  try {
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

    const user = getRequestUser(request);
    const record = await createRepairRecord({
      serialNumber,
      repairDate,
      issueDescription,
      serviceCenterCode,
      createdBy: user.userId,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
