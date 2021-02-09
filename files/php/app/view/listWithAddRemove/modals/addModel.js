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
`<div id="mdl-add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" class="modal fade" tabindex="-1" aria-labelledby="add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}-title" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}-title">Adicionar ${page.item.name.capitaliseFirstLetter()}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
                <form id="form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}">
`
                page.item.attributesAndColumnNames.forEach((item, index) => {
                    if (index == 0 || index % 3 == 0) {
                        result +=
`                   <div class="row">
`
                    }

                    if (item.type.id == 2 || item.type.id == 6) {
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
                            </div>
                        </div>
`
                    } else if (item.type.id == 1) {
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" type="number" id="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
                            </div>
                        </div>
`
                    } else if (item.type.id == 4 || item.type.id == 5) {    // TODO Needs to add a decimal mask
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
                            </div>
                        </div>
`
                    } else if (item.type.id == 3) {
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}"
                                    id="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}"
                                    value="0"
                                />
                                <label class="form-check-label" for="${item.attribute.replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}">
                                    ${item.attribute.capitaliseFirstLetter()}
                                </label>
                            </div>
                        </div>
`
                    }

                    if (index == 0 || index % 3 == 0) {
                        result +=
`                   </div>
`
                    }
                })
                result +=
`               </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button id="add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" type="button" class="btn btn-primary">Adicionar</button>
            </div>
        </div>
    </div>
</div>`

    return result
}