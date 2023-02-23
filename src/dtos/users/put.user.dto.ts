// import {
//   validate,
//   validateOrReject,
//   Contains,
//   IsInt,
//   Length,
//   IsEmail,
//   IsString,
//   IsBoolean,
//   IsFQDN,
//   IsDate,
//   Min,
//   Max,
//   IsOptional,
//   ValidateNested,
//   IsIn
// } from 'class-validator';

// import { Type } from 'class-transformer';

export class IPutUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permissionLevel: number;
}
