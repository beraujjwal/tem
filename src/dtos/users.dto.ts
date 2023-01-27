import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsString,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @Length(10)
  public phone: number;

  @IsString()
  public password: string;
}
