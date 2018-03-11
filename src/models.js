const mongoose = require('../lib/mongoose');

const { Schema } = mongoose;

const addressSchema = {
  type: String,
  required: true,
  unique: true,
  sparse: true,
  minlength: 42,
  maxlength: 42,
  trim: true,
};

/**
 * Artist + Fan user account.
 * They share one schema so a fan can switch to an artist if they want to.
 * For a fan, the `tokenContract` will just be null.
 * @type {Schema}
 */
const AccountSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
    minlength: 40,
    maxlength: 40,
    trim: true,
  },
  keystore: {
    type: Object,
    required: true,
  },
  tokenContract: {
    type: Schema.Types.ObjectId,
    ref: 'TokenContract',
    unique: true,
    sparse: true,
  },
  tokens: [{
    type: Schema.Types.ObjectId,
    ref: 'TokenContract',
  }],
});

/**
 * Token Contract.
 * @type {Schema}
 */
const TokenContractSchema = new Schema({
  address: addressSchema,
});

const Account = mongoose.model('Account', AccountSchema);
const TokenContract = mongoose.model('TokenContract', TokenContractSchema);

module.exports = {
  Account,
  TokenContract,
};
