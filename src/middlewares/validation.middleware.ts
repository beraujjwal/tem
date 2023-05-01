import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { DataValidationError } from '../system/core/exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        console.log(errors)
        const message = errors
          .map((error: ValidationError) => {
            let phoneNumber = error.value;
            let phoneLength = phoneNumber.toString().length;
            console.log(phoneLength)
            //return Object.values(error.constraints)
            return {
              [error.property]: Object.values(error.constraints)[0]
            }

          });//
          //.join(', ');
          return new DataValidationError(403, 'Invalid Data', message);
          //res.status(status).json({ message });
      } else {
        next();
      }
    });
    next();
  };
};

export default validationMiddleware;
