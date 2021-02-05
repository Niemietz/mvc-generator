var fs = require('fs');
var php = require('./phpPaths');
var java = require('./javaPaths');
var kotlin = require('./kotlinPaths');

const getClientAddress = function (req) {
	let result = (req.headers['x-forwarded-for'] || '').split(',')[0] 
	|| req.connection.remoteAddress

	if (result == "::1") {
		result = "127.0.0.1";
	}

	return result;
};

const getZipFromTime = function (ip, time, language) {
    let result = null
    
    let files = []
    
    if (language == 1) {
        files = fs.readdirSync(php.phpZipPath)
    } else if (language == 2) {
        files = fs.readdirSync(java.javaZipPath)
    } else if (language == 3) {
        files = fs.readdirSync(kotlin.kotlinZipPath)
    }

	files.forEach((file) => {
		if (file.split("-")[0] == ip) {
			var stats = fs.statSync(`${php.phpZipPath}\\${file}`);
			var mtime = stats.mtime.getTime();

			if (mtime == time) {
				result = file
				return false;
			}
		}
	})
	
	return result
}

const getZipsFromIP = function (ip, language) {
	let files = []
    
    if (language == 1) {
        files = fs.readdirSync(php.phpZipPath)
    } else if (language == 2) {
        files = fs.readdirSync(java.javaZipPath)
    } else if (language == 3) {
        files = fs.readdirSync(kotlin.kotlinZipPath)
    }

	const ipFiles = []
	files.forEach((file) => {
		if (file.split("-")[0] == ip) {
			ipFiles.push(file)
		}
	})
	
	return ipFiles
}

const generateUid = function() {
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }

    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
    lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
    lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
}

module.exports = {
    "getZipFromTime": getZipFromTime,
    "getZipsFromIP": getZipsFromIP,
    "getClientAddress": getClientAddress,
    "generateUid": generateUid
}