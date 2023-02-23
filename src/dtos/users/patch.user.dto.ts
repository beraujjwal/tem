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

import { IPutUserDto } from './put.user.dto';

export class IPatchUserDto extends Partial<IPutUserDto> {}
