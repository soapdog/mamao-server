var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
var username = "mamaouser";
var password = "mamaopass";
var address = '@ds031857.mongolab.com:31857/mamao';
connect();

// Connect to mongo
function connect() {
    var url = 'mongodb://' + username + ':' + password + address;
    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect()
}