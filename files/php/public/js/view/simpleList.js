exports.getSimpleListJSText = function() {
    let result =
`import { getItems } from './api.js';

const tblSimpleId = "table-simple"
const divContainerSimpleId = "container-table";
const divNoItemsId = "no-item";

function getItemsAndLoad() {
    getItems(
        function() {
            setLoading(true);
        }, function(items) {
            if (items.length > 0) {
                loadTable(items);

                document.getElementById(divContainerSimpleId).classList.remove("d-none");
                document.getElementById(divNoItemsId).classList.add("d-none");
            } else {
                document.getElementById(divContainerSimpleId).classList.add("d-none");
                document.getElementById(divNoItemsId).classList.remove("d-none");
                showMessage("Algo deu errado!", 2);
            }
            setLoading(false);
        }, function(error) {
            document.getElementById(divContainerSimpleId).classList.add("d-none");
            document.getElementById(divNoItemsId).classList.remove("d-none");
            showMessage("Algo deu errado!", 2);
            //console.error(error);
            setLoading(false);
        }
    )
}

function loadTable(items) {
    $(\`#\${tblSimpleId}\`).DataTable({
        data: items, // TODO Deve estar assim: [ [ 1, "ModelA" ], [ 2, "ModelB" ] ]
        columns: [
            { title: "Id" },
            { title: "Nome" }
        ],
        autoWidth: false,
        columnDefs: [{
            targets: ['_all'],
            className: 'mdc-data-table__cell'
        }]
    });
}

document.addEventListener(contentLoadedEventListener, (event) => {
    document.getElementById(divContainerSimpleId).classList.add("d-none");
    document.getElementById(divNoItemsId).classList.remove("d-none");

    getItemsAndLoad();
});`

    return result
}