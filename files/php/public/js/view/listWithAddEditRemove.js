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
`import { add${page.item.name.capitaliseFirstLetter()}, edit${page.item.name.capitaliseFirstLetter()}, delete${page.item.name.capitaliseFirstLetter()}, get${page.item.name.capitaliseFirstLetter()}, get${page.item.name.capitaliseFirstLetter()}s } from './../api.js';

const ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute = "${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id"
const lab${page.item.name.capitaliseFirstLetter()}TitleId = "add-edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}-title"
const mdl${page.item.name.capitaliseFirstLetter()}Id = "mdl-add-edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}"
const frm${page.item.name.capitaliseFirstLetter()}Id = "form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const divContainer${page.item.name.capitaliseFirstLetter()}sId = "container-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const divNo${page.item.name.capitaliseFirstLetter()}sId = "no-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const btnRemoveClass = "remove-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const btnAddEditId = "add-edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
`

    page.item.attributesAndColumnNames.forEach((item) => {
        result += `const inp${item.attribute.capitaliseFirstLetter()}Id = "${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}";
`
    });

    result += `
function getEditRemoveButtonHTML() {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.setAttribute("data-mdb-toggle", "modal")
    editButton.setAttribute("data-mdb-target", \`#\${mdl${page.item.name.capitaliseFirstLetter()}Id}\`)
    editButton.setAttribute("editing", "true")
    editButton.classList.add("btn");
    editButton.classList.add("btn-warning");
    editButton.innerHTML = "Atualizar";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    removeButton.classList.add(btnRemoveClass);
    removeButton.innerHTML = "Remover";
    
    const divButtons = document.createElement("div");
    divButtons.append(editButton);
    divButtons.append(removeButton);

    return divButtons
}

function treatFormData(data) {
`
    page.item.attributesAndColumnNames.forEach((item) => {
        if (item.type.id == 1) {
            result += `data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = parseInt(data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"])
    `
        } else if (item.type.id == 3) {
            result += `data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = (data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] == "true") ? true : false;
    `
        } else if (item.type.id == 4 || item.type.id == 5) {
            result += `data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"] = parseFloat(data["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"])
    `
        }
    });
    result += `
    return data
}

function get${page.item.name.capitaliseFirstLetter()}sAndLoad() {
    get${page.item.name.capitaliseFirstLetter()}s(
        function() {
            setLoading(true);
        }, function(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s) {
            if (${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s.length > 0) {
                loadTable(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s);

                document.getElementById(divContainer${page.item.name.capitaliseFirstLetter()}sId).classList.remove("d-none");
                document.getElementById(divNo${page.item.name.capitaliseFirstLetter()}sId).classList.add("d-none");
            } else {
                document.getElementById(divContainer${page.item.name.capitaliseFirstLetter()}sId).classList.add("d-none");
                document.getElementById(divNo${page.item.name.capitaliseFirstLetter()}sId).classList.remove("d-none");
                showMessage("Algo deu errado!", 2);
            }
            setLoading(false);
        }, function(error) {
            document.getElementById(divContainer${page.item.name.capitaliseFirstLetter()}sId).classList.add("d-none");
            document.getElementById(divNo${page.item.name.capitaliseFirstLetter()}sId).classList.remove("d-none");
            showMessage("Algo deu errado!", 2);
            //console.error(error);
            setLoading(false);
        }
    )
}

function loadTable(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s) {
    ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s.forEach((${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}) => {
        ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.push(getEditRemoveButtonHTML())
    });

    $(\`#\${tbl${page.item.name.capitaliseFirstLetter()}Id}\`).DataTable({
        data: ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s, // TODO Deve estar assim: [ [ 1, "ModelA" ], [ 2, "ModelB" ] ]
        columns: [
            { title: "Id" },
            { title: "Nome" },
            { title: "#" }
        ],
        autoWidth: false,
        columnDefs: [{
            targets: ['_all'],
            className: 'mdc-data-table__cell'
        }]
    });
}

document.addEventListener(contentLoadedEventListener, function(event) {
    document.getElementById(divContainer${page.item.name.capitaliseFirstLetter()}sId).classList.add("d-none");
    document.getElementById(divNo${page.item.name.capitaliseFirstLetter()}sId).classList.remove("d-none");

    const modalEl = document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id);
    const modal = new mdb.Modal(modalEl);

    get${page.item.name.capitaliseFirstLetter()}sAndLoad();

    modalEl.addEventListener('show.mdb.modal', (event) => {
        /*if (event.target.related.getAttribute("editing") == "true") {   // TODO Review
            const ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = -1; // TODO Review (Pegar da coluna da tabela)
            document.getElementById(btnAddEditId).setAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute, ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id)
            document.getElementById(btnAddEditId).innerHTML = "Atualizar"
            document.getElementById(lab${page.item.name.capitaliseFirstLetter()}TitleId).innerHTML = "Atualizar ${page.item.name.capitaliseFirstLetter()}"
            
            get${page.item.name.capitaliseFirstLetter()}(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id,
                function() {
                    setLoading(true);
                    //setLoadingModal(true, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                },
                function(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}) {
`
    page.item.attributesAndColumnNames.forEach((item) => {
        if (item.type.id == 3) {
            result += `
                    if (${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}) {
                        document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).checked = true;
                    } else {
                        document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).checked = false;
                    }
`
        } else {
            result += `
                    document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).value = ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}
`
        }
    })

    result += `
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    setLoading(false);
                },
                function(error) {
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    modal.hide();
                    showMessage("Algo deu errado!", 2);
                    //console.error(error);
                    setLoading(false);
                }
            )
        } else {*/
            document.getElementById(btnAddEditId).removeAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute)
            document.getElementById(btnAddEditId).innerHTML = "Adicionar"
            document.getElementById(lab${page.item.name.capitaliseFirstLetter()}TitleId).innerHTML = "Adicionar ${page.item.name.capitaliseFirstLetter()}"
        //}
    });

    document.getElementsByClassName(btnRemoveClass).forEach((btnRemove) => {
        btnRemove.onclick = function(evt) {
            const ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = -1; // TODO Review (Pegar da coluna da tabela)

            Notiflix.Confirm.Show(
                'Atenção',
                'Tem certeza que deseja remover a/o ${page.item.name.capitaliseFirstLetter()}?',
                'Sim',
                'Não',
                function() {
                    delete${page.item.name.capitaliseFirstLetter()}(
                        ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id,
                        function() {
                            setLoading(true);
                        },
                        function(result) {
                            if (result) {
                                showMessage("O/A ${page.item.name.capitaliseFirstLetter()} foi removido!", 1);
                                get${page.item.name.capitaliseFirstLetter()}sAndLoad()
                            } else {
                                showMessage("Algo deu errado!", 2);
                                setLoading(false);
                            }
                        },
                        function(error) {
                            showMessage("Algo deu errado!", 2);
                            //console.error(error);
                            setLoading(false);
                        }
                    )
                },
                null
            );
        };
    });

    document.getElementById(btnAddEditId).onclick = function(evt) {
        let ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = -1
        if (this.hasAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute)) {
            ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = parseInt(this.getAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute))
        }

        const form = document.getElementById(frm${page.item.name.capitaliseFirstLetter()}Id);

        let data = form.serializeFormJSON();

        data = treatFormData(data);

        if (${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id > -1) {
            edit${page.item.name.capitaliseFirstLetter()}(
                ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id,
                data,
                function() {
                    setLoading(true);
                    //setLoadingModal(true, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                }, function(result) {
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    modal.hide();
                    if (result) {
                        get${page.item.name.capitaliseFirstLetter()}sAndLoad()
                        showMessage("O/A ${page.item.name.capitaliseFirstLetter()} foi atualizado!", 1);
                    } else {
                        showMessage("Algo deu errado!", 2);
                    }
                    setLoading(false);
                }, function(error) {
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    modal.hide();
                    showMessage("Algo deu errado!", 2);
                    //console.error(error);
                    setLoading(false);
                }
            )
        } else {
            add${page.item.name.capitaliseFirstLetter()}(
                data,
                function() {
                    setLoading(true);
                    //setLoadingModal(true, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                }, function(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id) {
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    modal.hide();
                    if (${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id > 0) {
                        get${page.item.name.capitaliseFirstLetter()}sAndLoad();
                        showMessage("O/A ${page.item.name.capitaliseFirstLetter()} foi atualizado!", 1);
                    } else {
                        showMessage("Algo deu errado!", 2);
                    }
                    setLoading(false);
                }, function(error) {
                    //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                    modal.hide();
                    showMessage("Algo deu errado!", 2);
                    //console.error(error);
                    setLoading(false);
                }
            )
        }
    };
});`

    return result
}