import { model, Schema, Model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { IUser } from '../interfaces/users.interface';

const schema: Schema = new Schema<IUser>({
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
  password: { 
    type: String, 
    trim: true, 
    select: true 
  },
  status: {
    type: Boolean,
    index: true,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
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
      full: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
      deny: { type: Boolean, default: false },
    },
  ],
}, { timestamps: true },);

schema.path('email').validate((val) => {
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

/*schema.path("_id").validate(function (v) {
    return validator.isUUID(v);
}, "ID is not a valid GUID: {VALUE}");*/

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.v = __v;
  return object;
});

schema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


schema.pre('save', async function (next) {
  let user = this;
  const SALT_FACTOR = 10;

  // If user is not new or the password is not modified
  if (!user.isModified('password')) {
    return next();
  }

  if (this.isModified('password') || this.isNew) {
    // Encrypt password before saving to database

    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    user.password = bcrypt.hashSync(user.password, salt);
  }
  if (user.isNew) {
    user.createAt = user.updateAt = Date.now();
  } else {
    user.updateAt = Date.now();
  }

  if (user.loginAttempts >= 5) {
    user.loginAttempts = 0;
    user.blockExpires = new Date(Date.now() + 60 * 5 * 1000);
  }

  let emailCriteria = {
    email: user.email,
    verified: true,
    deleted: false,
    status: false,
    _id: { $ne: user._id },
  };
  await model('User').findOne(emailCriteria, 'email', async function (err: any, results: IUser) {
    if (err) {
      next(err);
    } else if (results) {
      //console.warn('results', results);
      user.invalidate('email', 'Email must be unique');
      next(new Error('Email must be unique'));
    } else {
      next();
    }
  });

  let phoneCriteria = {
    phone: user.phone,
    verified: true,
    deleted: false,
    status: false,
    _id: { $ne: user._id },
  };
  await model('User').findOne(phoneCriteria, 'phone', async function (err: any, results: IUser) {
    if (err) {
      next(err);
    } else if (results) {
      //console.warn('results', results);
      user.invalidate('phone', 'Phone number must be unique');
      next(new Error('Phone number must be unique'));
    } else {
      next();
    }
  });
});


const userModel = model<IUser>('User', schema);

export default userModel;
