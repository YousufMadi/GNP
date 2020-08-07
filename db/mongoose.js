const mongoose = require("mongoose");

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin@gnpcluster.akjrk.mongodb.net/GNP?retryWrites=true&w=majority";
//"mongodb://localhost:27017/GN";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

module.exports = { mongoose }; // Export the active connection.
