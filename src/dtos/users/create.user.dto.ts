import {
  // validate,
  // validateOrReject,
  // Contains,
  // IsInt,
  Length,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumber,
  IsBoolean,
  IsPositive,
  IsPhoneNumber,
  // IsFQDN,
  // IsDate,
  // Min,
  // Max,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  // IsIn
} from 'class-validator';

//import { Type } from 'class-transformer';

// import { validate, validateSync, ValidationError, ValidatorOptions } from 'class-validator';

// // Strict options by default
// const defaultOpts: ValidatorOptions = {
//   whitelist: true,
//   forbidNonWhitelisted: true,
//   forbidUnknownValues: true,
// };

export class ICreateUserDto {

  @IsOptional()
  id: string;

  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  //@Length(10)
  @IsPositive()
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  public phone: number;

  @IsString()
  public password: string;

  @IsBoolean()
  @IsOptional()
  public status: boolean;

  @IsBoolean()
  @IsOptional()
  public verified: boolean;

  @IsString()
  @IsOptional()
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
