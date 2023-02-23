import { ValidationError } from 'class-validator';
import { getValidationErrorMap, ValidationErrorMap } from './errorMap.dto';

/**
 * The default validation error class, used when no custom validation error handler is set.
 */
export class ValidationException extends Error {
  /**
   * An object with key-value pairs where the keys represent a property name, and the values
   * are an array of all validation error messages for that property.
   */
  public validationErrors: ValidationErrorMap;

  /**
   * Error thrown when a data transfer object's validation has failed.
   * @param errors A validation error map, or an array of `ValidationError`.
   */
  constructor(errors: ValidationErrorMap | ValidationError[]) {
    super('Validation failed');
    this.validationErrors = Array.isArray(errors) ? getValidationErrorMap(errors) : errors;
  }
}