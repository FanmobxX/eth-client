const mongoose = require('../../lib/mongoose');

const { Schema } = mongoose;

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
  tokenContractAddress: {
    type: String,
    required: false,
    unique: true,
    minlength: 40,
    maxlength: 40,
    trim: true,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
