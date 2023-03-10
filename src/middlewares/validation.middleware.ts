import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '../system/core/exceptions/HttpException';

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
            return Object.values(error.constraints)/*{
              key: error.property,
              message: Object.values(error.constraints)
            }*/
          })
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
    next();
  };
};

export default validationMiddleware;
