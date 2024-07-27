'use strict';
import path from 'path';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, DEFAULT_EMAIL, DEFAULT_SUBJECT } from '../config';
export const config: any = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  //secure: EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
};

export const defaultMail: any = {
  from: DEFAULT_EMAIL,
  subject: DEFAULT_SUBJECT || 'Usha Digital',
  to: DEFAULT_EMAIL,
  template: 'index',
  attachments: [
    { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
  ]
};
