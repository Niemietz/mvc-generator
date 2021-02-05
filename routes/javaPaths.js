var path = require('path');
var config = require('./config');

const javaZipPath = path.join(require.main.filename, `/../../files/java/zip`)

module.exports = {
    "javaZipPath": javaZipPath
}