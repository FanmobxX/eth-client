const mongoose = require('./../lib/mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  keystore: Object,
});

module.exports = mongoose.model('Account', AccountSchema);
