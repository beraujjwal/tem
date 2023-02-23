import { Document } from 'mongoose';

export interface Resource {
  resource: string;
  full: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
  read: boolean;
  deny: boolean;
}

export interface Role {
  resource: string;
}

export interface User {
  name: string;
  email: string;
  phone: number;
  password: string;
  status: boolean;
  verified: boolean;
  roles: string[];
  loginAttempts: number;
  blockExpires: Date;
  rights: [Resource];
}

export interface IUser extends Document, User {
  _id: string;
}
