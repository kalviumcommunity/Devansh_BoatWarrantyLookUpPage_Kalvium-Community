export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export function handleApiError(error) {
  if (error instanceof ValidationError) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  if (error instanceof NotFoundError) {
    return Response.json({ error: error.message }, { status: 404 });
  }

  console.error(error);
  return Response.json({ error: "Something went wrong" }, { status: 500 });
}
