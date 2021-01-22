(function($) {
    $.fn.upload = function(remote, data, successFn, progressFn) {
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
    };

    $.uploadFile = function(remote, file, data, successFn, progressFn)
    {
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

    $.fn.serializeFormJSON = function(useJsonInsteadOfArray)
    {
        const formData = new FormData(this[0]);

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
    };
})(jQuery);

function generateUid() {
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

function createFileInstance(filename, content, mimetype = "text/plain")
{    
    return new File(
        [content],
        filename,
        {
            lastModified: new Date(0), // optional - default = now
            type: mimetype // optional - default = ''
        }
    );
}

String.prototype.leftTrim = function() {
    return this.replace(/^\s+/,"");
}

String.prototype.spaceStringOnly = function() {
    let result = false
    if (!this.replace(/\s/g, '').length) {
        result = true
    }

    return result
}

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

Array.prototype.joinKeywords = function(char = " ") {
    const keywordsToShow = this.slice()
    if (char == " ") {
        for (let i = 0; i < keywordsToShow.length; i++) {
            keywordsToShow[i] = keywordsToShow[i].replace(" ", "-")
        }
    }

    return keywordsToShow.join(char);
}

HTMLElement.prototype.submitLikeInputPress = function() {
    const submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("style", "display: none")

    this.append(submit)
    submit.click()

    submit.remove()
}