const mongoose = require('../lib/mongoose');

const AccountSchema = new mongoose.Schema({
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
    sparse: true,
    minlength: 40,
    maxlength: 40,
    trim: true,
  },
  tokenContractABI: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
