var path = require('path');

const phpFilesPath = path.join(require.main.filename, '/../../files/php')
const javaFilesPath = path.join(require.main.filename, '/../../files/java')
const kotlinFilesPath = path.join(require.main.filename, '/../../files/kotlin')

module.exports = {
    "phpFilesPath": phpFilesPath,
    "javaFilesPath": javaFilesPath,
    "kotlinFilesPath": kotlinFilesPath
};