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

/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

exports.getText = function(page) {
    let result = 
`import { add${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}, edit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()} } from './../api.js';

const ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute = "${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id";
const frm${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Id = "form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const btnEditId = "edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const btnAddId = "add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";

function treatFormData(data) {
    `
    page.item.attributesAndColumnNames.forEach((item) => {
        if (item.type.id == 1) {
            result += `data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = parseInt(data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"])
    `
        } else if (item.type.id == 3) {
            result += `data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = (data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] == "true") ? true : false;
    `
        } else if (item.type.id == 4 || item.type.id == 5) {
            result += `data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = parseFloat(data["${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.charAt(0).toLowerCase())}"])
    `
        }
    });

    result += `return data
}

document.addEventListener(contentLoadedEventListener, function(event) {
    document.getElementById(btnEditId).onclick = function(evt) {
        const ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id = this.getAttribute(${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}IdAttribute);

        const form = document.getElementById(frm${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Id);

        let data = form.serializeFormJSON();

        data = treatFormData(data);

        edit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}(
            ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id,
            data,
            function() {
                setLoading(true);
            }, function(result) {
                if (result) {
                    showMessage("O/A ${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()} foi atualizado!", 1);
                } else {
                    showMessage("Algo deu errado!", 2);
                }
                setLoading(false);
            }, function(error) {
                showMessage("Algo deu errado!", 2);
                //console.error(error);
                setLoading(false);
            }
        )
    };

    document.getElementById(btnAddId).onclick = function(evt) {
        const form = document.getElementById(frm${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Id);

        let data = form.serializeFormJSON();

        data = treatFormData(data);

        add${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}(
            data,
            function() {
                setLoading(true);
            }, function(result) {
                if (result) {
                    showMessage("O/A ${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()} foi atualizado!", 1);
                } else {
                    showMessage("Algo deu errado!", 2);
                }
                setLoading(false);
            }, function(error) {
                showMessage("Algo deu errado!", 2);
                //console.error(error);
                setLoading(false);
            }
        )
    };
});`

    return result;
}