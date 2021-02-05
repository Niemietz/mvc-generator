const contentLoadedEventListener = "DOMContentLoaded";

/**
 * It creates a file instance
 */
function createFileInstance(filename, content, mimetype = "text/plain") {
    return new File(
        [content],
        filename,
        {
            lastModified: new Date(0), // optional - default = now
            type: mimetype // optional - default = ''
        }
    );
}

/**
 * It converts a JSON array string to JSON array
 */
function convertJsonArrayStringInJsonArray(jsonArrayStr) {
    jsonArray = [];

    $.each(jsonArrayStr, function(index, jsonObj)
    {
        jsonObj = parseJSON(jsonObj);

        jsonArray.push(jsonObj);
    });

    return jsonArray;
}

/**
 * It tries to parse the String to Integer
 */
function tryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

/**
 * It sends JSON Array data to Ajax Request
 */
function jsonArrayAjax(obj = { url: viewController, type: "POST" }) {
    obj["accepts"] = {
        jsonArray: 'application/json-array'
    };
    obj["converters"] = {
        'json jsonArray': function(response)
        {
            if(response.error == null && response.result != null)
            {
                response.result = convertJsonArrayStringInJsonArray(response.result);
            }

            return response;
        }
    };
    obj["dataType"] = 'jsonArray';

    $.ajax(obj);
}

/**
 * It sends JSON data to Ajax Request
 */
function jsonAjax(obj = { url: viewController, type: "POST" }) {
    obj["accepts"] = {
        jsonJson: 'application/json-json'
    };
    obj["converters"] = {
        'json jsonJson': function(response)
        {
            if(response.error == null && response.result != null)
            {
                response.result = parseJSON(response.result);
            }

            return response;
        }
    };
    obj["dataType"] = 'jsonJson';

    $.ajax(obj);
}

/**
 * It sends some data and/or a file to be uploaded on server
 */
function uploadFile(remote, file, data, successFn, progressFn) {
    if (typeof file != "object") {
        return false;
    }

    // if we dont have post data, move it along
    if (typeof data != "object") {
        progressFn = successFn;
        successFn = data;
    }

    var formData = new FormData();
    formData.append("file", file);

    // if we have post data too
    if (typeof data == "object") {
        for (var i in data) {
            formData.append(i, data[i]);
        }
    }

    var def = new $.Deferred();
    // do the ajax request
    $.ajax({
        url: remote,
        type: "POST",
        xhr: function() {
            myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload && progressFn) {
                myXhr.upload.addEventListener("progress", function(prog) {
                    var value = ~~((prog.loaded / prog.total) * 100);

                    // if we passed a progress function
                    if (typeof progressFn === "function") {
                        progressFn(prog, value);

                        // if we passed a progress element
                    } else if (progressFn) {
                        $(progressFn).val(value);
                    }
                }, false);
            }
            return myXhr;
        },
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        complete: function(res) {
            var json;
            try {
                json = JSON.parse(res.responseText);
            } catch (e) {
                json = res.responseText;
            }
            if (typeof successFn === "function") successFn(json);
            def.resolve(json);
        }
    });

    def.promise();
}

/**
 * It serializes form in JSON structure
 */
HTMLFormElement.prototype.serializeFormJSON = function(useJsonInsteadOfArray) {
    const formData = new FormData(this);

    let obj = {};
    for (let item of formData.entries())
    {
        const key = item[0];
        const value = item[1];

        if(formData.getAll(key).length > 1)
        {
            if(useJsonInsteadOfArray)
            {
                obj[key] = Object.assign({}, formData.getAll(key));
            }
            else
            {
                obj[key] = formData.getAll(key);
            }
        }
        else
        {
            obj[key] = value;
        }
    }

    return obj;
}

/**
 * It sends some data to be uploaded on server
 */
HTMLInputElement.prototype.upload = function(remote, data, successFn, progressFn) {
    // if we dont have post data, move it along
    if (typeof data != "object") {
        progressFn = successFn;
        successFn = data;
    }

    var formData = new FormData();

    var numFiles = 0;
    this.each(function() {
        var i, length = this.files.length;
        numFiles += length;
        for (i = 0; i < length; i++) {
            formData.append(this.name, this.files[i]);
        }
    });

    // if we have post data too
    if (typeof data == "object") {
        for (var i in data) {
            formData.append(i, data[i]);
        }
    }

    var def = new $.Deferred();
    if (numFiles > 0) {
        // do the ajax request
        $.ajax({
            url: remote,
            type: "POST",
            xhr: function() {
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload && progressFn) {
                    myXhr.upload.addEventListener("progress", function(prog) {
                        var value = ~~((prog.loaded / prog.total) * 100);

                        // if we passed a progress function
                        if (typeof progressFn === "function") {
                            progressFn(prog, value);

                            // if we passed a progress element
                        } else if (progressFn) {
                            $(progressFn).val(value);
                        }
                    }, false);
                }
                return myXhr;
            },
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            complete: function(res) {
                var json;
                try {
                    json = JSON.parse(res.responseText);
                } catch (e) {
                    json = res.responseText;
                }
                if (typeof successFn === "function") successFn(json);
                def.resolve(json);
            }
        });
    } else {
        def.reject();
    }

    return def.promise();
}

/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

/**
 * It pads the String with left zeros
 */
String.prototype.pad = function(maxLength) {
    let target = this;

    while(target.length < maxLength)
    {
        target = "0" + target;
    }

    return target;
}

/**
 * It checks if String is on a valid JSON notation
 */
String.prototype.isJson = function(value) {
    try
    {
        JSON.parse(this);
    }
    catch (ex)
    {
        return false;
    }

    return true;
}

/**
 * It parses the String to JSON
 */
String.prototype.parseJSON = function()  {
    let result = null;

    try
    {
        result = JSON.parse(this);
        if(typeof result == "string")
        {
            result = JSON.parse(result);
        }
    }
    catch (ex)
    {
        throw "Could not parse JSON from String!\n\n" + ex;
    }

    return result;
}

/**
 * It trims just the left side of string
 */
String.prototype.leftTrim = function() {
    return this.replace(/^\s+/,"");
}

/**
 * It checks if string is has space characters
 */
String.prototype.hasSpace = function() {
    return (/\s/.test(this))
}

/**
 * It checks if string is composed just by space characters
 */
String.prototype.spaceStringOnly = function() {
    let result = false
    if (!this.replace(/\s/g, '').length) {
        result = true
    }

    return result
}

/**
 * It splits the string to array as keywords, trimming each string
 */
String.prototype.splitAndTrim = function(char = ",") {
    let keywords = []
    if (this != null) {
        keywords = this.split(char)

        const keywordsToRemove = []
        for (let i = 0; i < keywords.length; i++) {
            if(keywords[i].spaceStringOnly()) {
                keywordsToRemove.push(i)
            } else {
                keywords[i] = keywords[i].trim().leftTrim()
                if (keywords[i].length == 0) {
                    keywords.splice(i, 1);
                }
            }
        }

        for (var i = keywordsToRemove.length - 1; i >= 0; i--) {
            keywords.splice(keywordsToRemove[i], 1);
        }
    }

    return keywords
}

/**
 * It joins strings in array to a unique string as keywords to show, replacing space in string to hyphen
 */
Array.prototype.joinKeywords = function(char = " ") {
    const keywordsToShow = this.slice()
    if (char == " ") {
        for (let i = 0; i < keywordsToShow.length; i++) {
            keywordsToShow[i] = keywordsToShow[i].replace(" ", "-")
        }
    }

    return keywordsToShow.join(char);
}

/**
 * It submits the form as if pressing a submit input element
 */
HTMLFormElement.prototype.submitLikeInputPress = function() {
    const submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("style", "display: none")

    this.append(submit)
    submit.click()

    submit.remove()
}

/**
 * It replaces a char in string from an index
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**
 * It changes the first letter of each word in String to uppercase
 */
String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

/**
 * It validates if the String is in a valid e-mail structure
 */
String.prototype.isAValidEmail = function()
{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(this);
}