exports.getAddModal = function() {
    let result =
`<div id="mdl-add-${page.item.name.replaceAt(0, item.page.item.name.charAt(0).toLowerCase())}" class="modal fade" tabindex="-1" aria-labelledby="add-${page.item.name.replaceAt(0, item.page.item.name.charAt(0).toLowerCase())}-title" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-${page.item.name.replaceAt(0, item.page.item.name.charAt(0).toLowerCase())}-title">Adicionar ${page.model.name.capitaliseFirstLetter()}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Fechar" ></button>
            </div>
            <div class="modal-body">
                <form id="form-model">
`
                page.item.attributesAndColumns.forEach((item, index) => {
                    if (index == 0 || index % 3 == 0) {
                        result +=
`                   <div class="row">
`
                    }

                    if (item.type.id == 2 || item.type.id == 6) {
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
                            </div>
                        </div>
`
                    } else if (item.type.id == 1) {
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="number" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
                            </div>
                        </div>
`
                    } else if (item.type.id == 4 || item.type.id == 5) {    // TODO Needs to add a decimal mask
                        result +=
`                       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-outline">
                                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control" />
                                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
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
                                    name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"
                                    id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"
                                    value="0"
                                />
                                <label class="form-check-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">
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
                <button id="add-${page.item.name.replaceAt(0, item.page.item.name.charAt(0).toLowerCase())}" type="button" class="btn btn-primary">Adicionar</button>
            </div>
        </div>
    </div>
</div>`

    return result
}