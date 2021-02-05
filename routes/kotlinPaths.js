var path = require('path');
var config = require('./config');

const kotlinZipPath = path.join(require.main.filename, `/../../files/kotlin/zip`)

module.exports = {
    "kotlinZipPath": kotlinZipPath
}