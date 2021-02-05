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
`import { edit${page.item.name.capitaliseFirstLetter()}, get${page.item.name.capitaliseFirstLetter()}, get${page.item.name.capitaliseFirstLetter()}s } from './../api.js';

const tbl${page.item.name.capitaliseFirstLetter()}Id = "table-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}"
const mdl${page.item.name.capitaliseFirstLetter()}Id = "mdl-edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}"
const frm${page.item.name.capitaliseFirstLetter()}Id = "form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const divContainer${page.item.name.capitaliseFirstLetter()}sId = "container-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const divNo${page.item.name.capitaliseFirstLetter()}sId = "no-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const btnEditId = "edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
`
    page.item.attributesAndColumnNames.forEach((item) => {
        result += `const inp${item.attribute.capitaliseFirstLetter()}Id = "${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}";
`
    })

    result += `
function getEditButtonHTML() {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-mdb-toggle", "modal")
    button.setAttribute("data-mdb-target", \`#\${mdl${page.item.name.capitaliseFirstLetter()}Id}\`)
    button.classList.add("btn");
    button.classList.add("btn-warning");
    button.innerHTML = "Atualizar";

    return button
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
        ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.push(getEditButtonHTML())
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
        const ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = -1; // TODO Review (Pegar da coluna da tabela)

        get${page.item.name.capitaliseFirstLetter()}(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id,
            function() {
                setLoading(true);
                //setLoadingModal(true, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
            },
            function(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}) {
                document.getElementById(btnEditId).setAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute, ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id)`
    page.item.attributesAndColumnNames.forEach((item) => {
        if (item.type.id == 3) {
            result += `
               if (${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}) {
                    document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).checked = true;
                } else {
                    document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).checked = false;
                }`
        } else {
            result += `
                document.getElementById(inp${item.attribute.capitaliseFirstLetter()}Id).value = ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}`
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
    })

    document.getElementById(btnEditId).onclick = function(evt) {
        const ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id = parseInt(this.getAttribute(${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}IdAttribute))

        const form = document.getElementById(frm${page.item.name.capitaliseFirstLetter()}Id);

        let data = form.serializeFormJSON();

        data = treatFormData(data);

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
                    showMessage("O/A ${page.item.name.capitaliseFirstLetter()} foi atualizado!", 1);
                    get${page.item.name.capitaliseFirstLetter()}sAndLoad()
                } else {
                    showMessage("Algo deu errado!", 2);
                    setLoading(false);
                }
            }, function(error) {
                //setLoadingModal(false, document.getElementById(mdl${page.item.name.capitaliseFirstLetter()}Id)); // TODO Review
                modal.hide();
                showMessage("Algo deu errado!", 2);
                //console.error(error);
                setLoading(false);
            }
        )
    };
});`

    return result
}