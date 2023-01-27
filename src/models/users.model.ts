import { model, Schema, Model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/users.interface';

const userSchema: Schema = new Schema<IUser>({
  _id: {
    type: String,
    auto: true,
    default: () => uuidv4(),
    lowercase: true,
  },
  name: {
    type: String,
    index: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    trim: true,
  },
  phone: {
    type: Number,
    index: true,
    required: true,
    trim: true,
  },
  password: { type: String, trim: true, select: true },
  status: Boolean,
  verified: {
    type: Boolean,
    index: true,
    trim: true,
  },
  roles: [
    {
      type: String,
      ref: 'Role',
    },
  ],
  loginAttempts: {
    type: Number,
    default: 0,
  },
  blockExpires: {
    type: Date,
    default: Date.now,
  },
  rights: [
    {
      resource: {
        type: String,
        ref: 'Resource',
      },
      create: { type: Boolean },
      delete: { type: Boolean },
      update: { type: Boolean },
      read: { type: Boolean },
      deny: { type: Boolean },
    },
  ],
});

const userModel = model<IUser>('User', userSchema);

export default userModel;
