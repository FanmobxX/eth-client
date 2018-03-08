const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

/**
 * Artist + Fan user account
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
 * Token Contract
 * @type {Schema}
 */
const TokenContractSchema = new Schema({
  address: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    minlength: 40,
    maxlength: 40,
    trim: true,
  },
  abi: {
    type: Object,
    required: false,
  },
});

module.exports = {
  mongoose.model('Account', AccountSchema),
  mongoose.model('TokenContract', TokenContractSchema),
};
