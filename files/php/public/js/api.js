String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

exports.getText = function(models) {
    let result =
`const apiLink = "/api";
`
    models.forEach((model) => {
        if (model.hasList) {
            result += `
/**
 * It gets ${model.name}s list
 * 
 * @function beforeSend - beforeSend function
 * @function onSuccess - On success function
 * @function onError - On error function
 */
export function get${model.name.capitaliseFirstLetter()}s(beforeSend, onSuccess, onError)
{
    const afterSuccess = function(response)
    {
        if(response.error == null && response.result != null)
        {
            if(onSuccess != null)
            {
                onSuccess(response.result);
            }
        }
        else
        {
            if(onError != null)
            {
                onError(response.error);
            }
        }
    };

    $.ajax({
        url: \`\${apiLink}/${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}s\`,
        dataType: "json",
        "beforeSend": function()
        {
            if(beforeSend != null)
            {
                beforeSend();
            }
        },
        success: function(response)
        {
            afterSuccess(response);
        },
        error: function(error)
        {
            if(error.status == 200 && error.statusText == "OK")
            {
                error.responseText = jQuery.parseJSON(error.responseText);

                const response = {};
                response["result"] = error.responseText.result;
                response["error"] = error.responseText.error;

                afterSuccess(response);
            }
            else
            {
                if(onError != null)
                {
                    onError(error);
                }
            }
        }
    });
}
`
        }

        if (model.select) {
            result += `
/**
 * It gets a(n) ${model.name}
 * 
 * @param {Number} ${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id - ${model.name.capitaliseFirstLetter()} ID
 * @function beforeSend - beforeSend function
 * @function onSuccess - On success function
 * @function onError - On error function
 */
export function get${model.name.capitaliseFirstLetter()}(${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id, beforeSend, onSuccess, onError)
{
    const afterSuccess = function(response)
    {
        if(response.error == null && response.result != null)
        {
            if(onSuccess != null)
            {
                onSuccess(response.result);
            }
        }
        else
        {
            if(onError != null)
            {
                onError(response.error);
            }
        }
    };

    $.ajax({
        url: \`\${apiLink}/${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}/\${${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id}\`,
        method: "GET",
        dataType: "json",
        "beforeSend": function()
        {
            if(beforeSend != null)
            {
                beforeSend();
            }
        },
        success: function(response)
        {
            afterSuccess(response);
        },
        error: function(error)
        {
            if(error.status == 200 && error.statusText == "OK")
            {
                error.responseText = jQuery.parseJSON(error.responseText);

                const response = {};
                response["result"] = error.responseText.result;
                response["error"] = error.responseText.error;

                afterSuccess(response);
            }
            else
            {
                if(onError != null)
                {
                    onError(error);
                }
            }
        }
    });
}
`
        }

        if (model.insert) {
            result += `
/**
 * It adds a(n) ${model.name}
 * 
 * @param {Object} data - ${model.name.capitaliseFirstLetter()} data
 * @function beforeSend - beforeSend function
 * @function onSuccess - On success function
 * @function onError - On error function
 */
export function add${model.name.capitaliseFirstLetter()}(data, beforeSend, onSuccess, onError)
{
    const afterSuccess = function(response)
    {
        if(response.error == null && response.result != null 
            && response.result > 0)                 // UNIQUE CONDITION
        {
            if(onSuccess != null)
            {
                onSuccess(response.result);
            }
        }
        else
        {
            if(onError != null)
            {
                onError(response.error);
            }
        }
    };

    $.ajax({
        url: \`\${apiLink}/add_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}\`,
        dataType: "json",
        method: "POST",
        data: data,
        "beforeSend": function()
        {
            if(beforeSend != null)
            {
                beforeSend();
            }
        },
        success: function(response)
        {
            afterSuccess(response);
        },
        error: function(error)
        {
            if(error.status == 200 && error.statusText == "OK")
            {
                error.responseText = jQuery.parseJSON(error.responseText);

                const response = {};
                response["result"] = error.responseText.result;
                response["error"] = error.responseText.error;

                afterSuccess(response);
            }
            else
            {
                if(onError != null)
                {
                    onError(error);
                }
            }
        }
    });
}
`
        }

        if (model.update) {
            result += `
/**
 * It updates a(n) ${model.name}
 * 
 * @param {Number} ${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id - ${model.name} ID
 * @param {Object} data - ${model.name.capitaliseFirstLetter()} data
 * @function beforeSend - beforeSend function
 * @function onSuccess - On success function
 * @function onError - On error function
 */
export function edit${model.name.capitaliseFirstLetter()}(${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id, 
data, beforeSend, onSuccess, onError)
{
    const afterSuccess = function(response)
    {
        if(response.error == null && response.result != null
            && response.result == true)                    // UNIQUE CONDITION
        {
            if(onSuccess != null)
            {
                onSuccess(response.result);
            }
        }
        else
        {
            if(onError != null)
            {
                onError(response.error);
            }
        }
    };

    $.ajax({
        url: \`\${apiLink}/edit_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}/\${${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id}\`,
        method: "POST",
        dataType: "json",
        data: data,
        "beforeSend": function()
        {
            if(beforeSend != null)
            {
                beforeSend();
            }
        },
        success: function(response)
        {
            afterSuccess(response);
        },
        error: function(error)
        {
            if(error.status == 200 && error.statusText == "OK")
            {
                error.responseText = jQuery.parseJSON(error.responseText);

                const response = {};
                response["result"] = error.responseText.result;
                response["error"] = error.responseText.error;

                afterSuccess(response);
            }
            else
            {
                if(onError != null)
                {
                    onError(error);
                }
            }
        }
    });
}
`
        }

        if (model.delete) {
            result += `    
/**
 * It deletes a(n) ${model.name}
 * 
 * @param {Number} ${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id - ${model.name} ID
 * @function beforeSend - beforeSend function
 * @function onSuccess - On success function
 * @function onError - On error function
 */
export function delete${model.name.capitaliseFirstLetter()}(${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id, beforeSend, onSuccess, onError)
{
    const afterSuccess = function(response)
    {
        if(response.error == null && response.result != null
            && response.result == true)                    // UNIQUE CONDITION
        {
            if(onSuccess != null)
            {
                onSuccess(response.result);
            }
        }
        else
        {
            if(onError != null)
            {
                onError(response.error);
            }
        }
    };

    $.ajax({
        url: \`\${apiLink}/delete_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}/\${${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id}\`,
        method: "GET",
        dataType: "json",
        "beforeSend": function()
        {
            if(beforeSend != null)
            {
                beforeSend();
            }
        },
        success: function(response)
        {
            afterSuccess(response);
        },
        error: function(error)
        {
            if(error.status == 200 && error.statusText == "OK")
            {
                error.responseText = jQuery.parseJSON(error.responseText);

                const response = {};
                response["result"] = error.responseText.result;
                response["error"] = error.responseText.error;

                afterSuccess(response);
            }
            else
            {
                if(onError != null)
                {
                    onError(error);
                }
            }
        }
    });
}`
        }
    })

    return result
}