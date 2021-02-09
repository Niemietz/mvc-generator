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
`import { delete${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}, get${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}s } from './../api.js';

const tbl${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Id = "table-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}"
const divContainer${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId = "container-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const divNo${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId = "no-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s";
const btnRemoveClass = "remove-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";

function getRemoveButtonHTML() {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.classList.add(btnRemoveClass);
    button.innerHTML = "Remover";

    return button
}

function get${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sAndLoad() {
    get${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}s(
        function() {
            setLoading(true);
        }, function(${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s) {
            if (${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s.length > 0) {
                loadTable(${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s);

                document.getElementById(divContainer${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.remove("d-none");
                document.getElementById(divNo${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.add("d-none");
            } else {
                document.getElementById(divContainer${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.add("d-none");
                document.getElementById(divNo${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.remove("d-none");
                showMessage("Algo deu errado!", 2);
            }
            setLoading(false);
        }, function(error) {
            document.getElementById(divContainer${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.add("d-none");
            document.getElementById(divNo${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.remove("d-none");
            showMessage("Algo deu errado!", 2);
            //console.error(error);
            setLoading(false);
        }
    )
}

function loadTable(${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s) {
    ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s.forEach((${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}) => {
        ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}.push(getRemoveButtonHTML())
    });

    $(\`#\${tbl${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Id}\`).DataTable({
        data: ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}s, // TODO Deve estar assim: [ [ 1, "ModelA" ], [ 2, "ModelB" ] ]
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
    document.getElementById(divContainer${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.add("d-none");
    document.getElementById(divNo${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sId).classList.remove("d-none");

    get${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sAndLoad();

    document.getElementsByClassName(btnRemoveClass).forEach((btnRemove) => {
        btnRemove.onclick = function(evt) {
            const ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id = -1; // TODO Review (Pegar da coluna da tabela)

            Notiflix.Confirm.Show(
                'Atenção',
                'Tem certeza que deseja remover a/o ${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}?',
                'Sim',
                'Não',
                function() {
                    delete${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}(
                        ${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id,
                        function() {
                            setLoading(true);
                        },
                        function(result) {
                            if (result) {
                                showMessage("O/A ${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()} foi removido!", 1);
                                get${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}sAndLoad()
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
});`

    return result
}