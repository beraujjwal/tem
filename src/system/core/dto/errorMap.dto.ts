import type { ValidationError } from 'class-validator';

/**
 * An object with key-value pairs where the keys represent a property name, and the values
 * are an array of all validation error messages for that property.
 */
export type ValidationErrorMap = { [property: string]: string[] };

/** `ValidationErrorMap` entry tuple. */
type ValidationErrorMapEntry = [property: string, errors: string[]];

/**
 * Receives an array of `ValidationError`, and generates an object with key-value pairs where
 * the keys represent a property name, and the values are an array of all validation error
 * messages for that property.
 * @param errors The array of `ValidationError` to generate a validation error map from.
 */
export function getValidationErrorMap(errors: ValidationError[]): ValidationErrorMap {
  const entries = errors.map(
    e => [e.property, Object.values(e.constraints ?? {})] as ValidationErrorMapEntry,
  );
  return Object.fromEntries(entries);
}