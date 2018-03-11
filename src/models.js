const mongoose = require('../lib/mongoose');

const { Schema } = mongoose;

/**
 * Represents an Ethereum address prefixed with 0x.
 * 40 hex chars (160 bits / 20 bytes)
 * @type {Object}
 */
const address = {
  type: String,
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
const accountSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  keystore: {
    type: Object,
    required: true,
  },
  tokenContractAddress: address,
  tokens: [address],
});

// adds `address` property (alias for `keystore.address`)
accountSchema.virtual('address').get(function () {
  return `0x${this.keystore.address}`;
});

accountSchema.statics.findAllArtists = function () {
  return this.find({ tokenContractAddress: { $exists: true } });
};

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  Account,
};
