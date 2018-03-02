require('dotenv').config();

const mongoose = require('mongoose');

// MongoDB setup
mongoose.Promise = global.Promise;

/**
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
const options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
};

const mongoUrl = process.env.MONGODB_URL;
// console.log(`Using mongo URI: ${mongoUrl}`);

mongoose.connect(mongoUrl, options);

mongoose.connection.on('error', (err) => {
  throw new Error(`Unable to connect to database MongoDB: ${err}`);
});

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

module.exports = mongoose;
