export default function(page) {
    let result = 
`import { add{page.item.name.capitaliseFirstLetter()} } from './api.js';

const frm${page.item.name.capitaliseFirstLetter()}Id = "form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";
const btnAddId = "add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}";

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

    result += `return data
}

document.addEventListener(contentLoadedEventListener, (event) => {
    document.getElementById(btnAddId).onclick = function(evt) {
        const form = document.getElementById(frm${page.item.name.capitaliseFirstLetter()}Id);

        let data = form.serializeFormJSON();

        data = treatFormData(data);

        add{page.item.name.capitaliseFirstLetter()}(
            data,
            function() {
                setLoading(true);
            }, function(result) {
                if (result) {
                    showMessage("O/A ${page.item.name.capitaliseFirstLetter()} foi atualizado!", 1);
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