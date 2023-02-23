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

import { ICreateUserDto } from './users/create.user.dto';
// import { IPatchUserDto } from './users/patch.user.dto';
// import { IPutUserDto } from './users/put.user.dto';

// import { Resource } from '../interfaces/users.interface';

export class CreateUserDto extends ICreateUserDto {}
