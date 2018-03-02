require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
};
mongoose.connect(process.env.MONGODB_URI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

module.exports = mongoose;
