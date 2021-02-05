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

exports.getText = function(page) {
    let result =
`<form id="form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}">
`
    page.item.attributesAndColumnNames.forEach((item, index) => {
        if (index % 3 == 0 || index == 0) {
            result +=
`    <div class="row">`
        }

        if (item.type.id == 2 || item.type.id == 6) {
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 1) {
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="number" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 4 || item.type.id == 5) {    // TODO Needs to add a decimal mask
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 3) {
            result +=
`       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"
                    id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"       
                    value="0"
                />
                <label class="form-check-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">
                    ${item.attribute.capitaliseFirstLetter()}
                </label>
            </div>
        </div>`
        }

        if (index % 3 == 0 || index == 0) {
            result +=
`    </div>`
        }
    })

    result +=
`</form>
<div class="row mt-3">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <button id="add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" type="button" class="btn btn-success">Adicionar</button>
    </div>
</div>`

    return result
}