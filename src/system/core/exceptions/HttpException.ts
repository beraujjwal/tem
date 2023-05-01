export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: any) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ApiError extends Error {
  statusCode: number;
  rawErrors: string[] = [];
  constructor(statusCode: number, message: string, rawErrors?: any[]) {
    super(message);

    this.statusCode = statusCode;
    if (rawErrors) this.rawErrors = rawErrors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(statusCode = 404, path: string) {
    super(statusCode, `The requested path ${path} not found!`);
  }
}

export class BadRequestError extends ApiError {
  constructor(statusCode = 500, message: string, errors: string[]) {
    super(statusCode, message, errors);
  }
}

export class ApplicationError extends ApiError {
  constructor(statusCode = 500, message: string, errors?: string[]) {
    super(statusCode, message, errors);
  }
}

export class DataValidationError extends ApiError {
  constructor(statusCode = 403, message: string, errors?: any[]) {
    super(statusCode, message, errors);
  }
}
