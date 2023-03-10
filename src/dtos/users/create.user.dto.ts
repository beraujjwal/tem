import {
  // validate,
  // validateOrReject,
  // Contains,
  // IsInt,
  Length,
  IsEmail,
  IsString,
  IsBoolean,
  // IsFQDN,
  // IsDate,
  // Min,
  // Max,
  IsOptional,
  ValidateNested,
  // IsIn
} from 'class-validator';

//import { Type } from 'class-transformer';

import { validate, validateSync, ValidationError, ValidatorOptions } from 'class-validator';

// Strict options by default
const defaultOpts: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
};

export class ICreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @Length(10)
  public phone: number;

  @IsString()
  public password: string;

  @IsBoolean()
  public status: boolean;

  @IsBoolean()
  public verified: boolean;

  @IsString()
  public roles: string[];

  @IsString()
  @IsOptional()
  public loginAttempts: number;

  @IsString()
  @IsOptional()
  public blockExpires: Date;

  // @ValidateNested({ each: true })
  // //@Type(() => Resource)
  // @IsOptional()
  // public rights?: Resource[];
}
