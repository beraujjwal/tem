'use strict';
require('dotenv').config();

module.exports = {
  consumerKey: process.env.QUICKBOOKS_CONSUMER_KEY || '*********',
  consumerSecret: process.env.QUICKBOOKS_CONSUMER_SECRET || '********',
  oauthToken: process.env.QUICKBOOKS_OAUTH_TOKEN || true,
  realmId: process.env.QUICKBOOKS_REALM_ID || '*****',
  sandbox: process.env.QUICKBOOKS_SANDBOX || true,
  debugging: process.env.QUICKBOOKS_DEBUG || true
};