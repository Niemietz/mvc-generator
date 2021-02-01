exports.getListWithRemoveJSText = function(page) {
    let result =
`import { delete${page.item.name.capitaliseFirstLetter()}, get${page.item.name.capitaliseFirstLetter()}s } from './api.js';

const tbl${page.item.name.capitaliseFirstLetter()}Id = "table-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}"
const divContainer${page.item.name.capitaliseFirstLetter()}sId = "container-${page.item.name.capitaliseFirstLetter()}s";
const divNo${page.item.name.capitaliseFirstLetter()}sId = "no-${page.item.name.capitaliseFirstLetter()}s";
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
        ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}.push(getRemoveButtonHTML())
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

document.addEventListener(contentLoadedEventListener, (event) => {
    document.getElementById(divContainer${page.item.name.capitaliseFirstLetter()}sId).classList.add("d-none");
    document.getElementById(divNo${page.item.name.capitaliseFirstLetter()}sId).classList.remove("d-none");

    get${page.item.name.capitaliseFirstLetter()}sAndLoad();

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
});`

    return result
}