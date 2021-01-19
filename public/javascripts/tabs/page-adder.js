import getModels from '/javascripts/tabs/model-adder.js';

const mdlAddPageModalId = "add-page-modal";
const btnAddPageId = "add-page";
const tblPagesBodyTableId = "pages-body-table";
const frmAddPageFormId = "add-page-form";
const divPagesId = "pages-list";
const divNoPageId = "no-page-warning";
const rdPageTypeName = "page-type";

const inpAddPageNameId = "name";
const inpAddPageRouteName = "route";
const inpAddPageDescriptionName = "page-description";
const inpAddPageKeywordsName = "keywords"
const rdPageModelName = "page-model";
const inpAddPageModelsTableId = "page-models-table";
const rdPageDefaultId = "default";
const rdPageInsertFormId = "insert-form";
const rdPageInsertEditFormId = "insert-edit-form";
const rdPageListWithInsertId = "list-with-insert";
const rdPageListWithEditId = "list-with-edit";
const rdPageListWithRemoveId = "list-with-remove";
const rdPageListWithInsertEditId = "list-with-insert-edit";
const rdPageListWithInsertRemoveId = "list-with-insert-remove";
const rdPageListWithEditRemoveId = "list-with-edit-remove";
const rdPageListWithInsertEditRemoveId = "list-with-insert-edit-remove";
const listWithItemIds = [
    rdPageInsertFormId,
    rdPageInsertEditFormId,
    rdPageListWithInsertId,
    rdPageListWithEditId,
    rdPageListWithRemoveId,
    rdPageListWithInsertEditId,
    rdPageListWithInsertRemoveId,
    rdPageListWithEditRemoveId,
    rdPageListWithInsertEditRemoveId
]

const pages = []
let currentEditPage = null

function fillAddPageModal(data) {
    document.getElementById(frmAddPageFormId)[inpAddPageNameId].value = data["name"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageRouteName].value = data["route"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageDescriptionName].value = data["description"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageKeywordsName].value = data["keywords"].join(",")

    const typeCheckbox = document.getElementById(frmAddPageFormId).querySelector(`input[value="${data["type"]["id"]}"]`)
    typeCheckbox.click()

    if (listWithItemIds.includes(typeCheckbox.id)) {
        if (data["item"]["id"] != null) {
            document.querySelector(`input[id="${data["item"]["id"]}"]`).click()
        }
    }

    $(`#${btnAddPageId}`).text("Editar");
}

function resetAddPageModal() {
    document.getElementById(frmAddPageFormId).reset()

    document.getElementById(inpAddPageModelsTableId).querySelectorAll("div").forEach((elem) => {
        elem.remove()
    })

    document.getElementById(rdPageDefaultId).click()

    $(`#${btnAddPageId}`).text("Adicionar")
}

function showNoPageWarning(show) {
    if (show) {
        $(`#${divNoPageId}`).removeClass("d-none")
        $(`#${divPagesId}`).addClass("d-none")
    } else {
        $(`#${divNoPageId}`).addClass("d-none")
        $(`#${divPagesId}`).removeClass("d-none")
    }
}

$(document).ready(function()
{
    document.getElementsByName(rdPageTypeName).forEach((radio) => {
        radio.onclick = function(ev) {
            if (listWithItemIds.includes(this.id)) {
                document.getElementById(inpAddPageModelsTableId).classList.remove("d-none")
            } else {
                document.getElementById(inpAddPageModelsTableId).classList.add("d-none")
            }
        }
    })

    $(`#${mdlAddPageModalId}`).on('shown.bs.modal', function(e) {
        if (currentEditPage != null) {
            fillAddPageModal(currentEditPage)
        }
    })

    $(`#${mdlAddPageModalId}`).on('show.bs.modal', function (e) {
        const models = getModels()

        document.getElementsByName(rdPageTypeName).forEach((radio) => {
            if (listWithItemIds.includes(radio.id) && models.length > 0) {
                radio.removeAttribute("disabled")
            } else if (listWithItemIds.includes(radio.id) && models.length == 0) {
                radio.setAttribute("disabled", true)
            }
        })

        models.forEach ((model, index) => {
            const newPageModelLabel = document.createElement("label");
            newPageModelLabel.classList.add("form-check-label")
            newPageModelLabel.setAttribute("for", model.id)
            newPageModelLabel.innerHTML = model.name

            const newPageModelCheckbox = document.createElement("input");
            newPageModelCheckbox.value = index + 1
            newPageModelCheckbox.id = model.id
            newPageModelCheckbox.name = rdPageModelName
            newPageModelCheckbox.type = "radio"
            newPageModelCheckbox.classList.add("form-check-input")
            newPageModelCheckbox.innerHTML = model.name;

            const newPageModel = document.createElement("div");
            newPageModel.classList.add("form-check")
            newPageModel.append(newPageModelCheckbox)
            newPageModel.append(newPageModelLabel)

            document.getElementById(inpAddPageModelsTableId).append(newPageModel)

            if (index == 0) {
                newPageModelCheckbox.click()
            }
        })
    })

    $(`#${mdlAddPageModalId}`).on('hidden.bs.modal', function (e) {
        resetAddPageModal()

        currentEditPage = null
    })

    $(`#${btnAddPageId}`).click(function(e)
    {
        const newPageData = $(`#${frmAddPageFormId}`).serializeFormJSON(false);

        if (currentEditPage != null) {
            currentEditPage.name = newPageData[inpAddPageNameId]

            currentEditPage.route = newPageData[inpAddPageRouteName]

            currentEditPage.description = newPageData[inpAddPageDescriptionName]

            const keywords = newPageData[inpAddPageKeywordsName].split(",")
            const keywordsToRemove = []
            for (let i = 0; i < keywords.length; i++) {
                if(keywords[i].spaceStringOnly()) {
                    keywordsToRemove.push(i)
                } else {
                    keywords[i] = keywords[i].trim().leftTrim()
                    if (keywords[i].length == 0) {
                        keywords.splice(i, 1);
                    }
                }
            }

            for (var i = keywordsToRemove.length -1; i >= 0; i--) {
                keywords.splice(keywordsToRemove[i], 1);
            }

            currentEditPage.keywords = keywords

            currentEditPage.type = parseInt(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).value)

            const tableLine = document.getElementById(currentEditPage.id)
            const type = document.querySelector(`input[name="${rdPageTypeName}"]:checked`).parentNode
            .querySelector("label").innerHTML

            currentEditPage.type = {
                "id": parseInt(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).value),
                "text": type
            }

            if (listWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)) {
                const checkedPageModel = document.querySelector(`input[name="${rdPageModelName}"]:checked`)
                const item = checkedPageModel.parentNode.querySelector("label").innerHTML
                tableLine.childNodes[5].innerHTML = `${type} (${item})`
                currentEditPage.item = { "model": item, "id": checkedPageModel.id }
            } else {
                tableLine.childNodes[5].innerHTML = `${type}`
                currentEditPage.item = { "model": null, "id": null }
            }

            tableLine.childNodes[1].innerHTML = currentEditPage.name
            tableLine.childNodes[2].innerHTML = `/${currentEditPage.route.toLowerCase()}`
            tableLine.childNodes[3].innerHTML = currentEditPage.description
            const keywordsToShow = keywords.slice()
            for (let i = 0; i < keywordsToShow.length; i++) {
                keywordsToShow[i] = keywordsToShow[i].replace(" ", "-")
            }
            tableLine.childNodes[4].innerHTML = keywordsToShow.join(" ")
        } else {
            let newPage = {}

            newPage.id = generateUid()

            const newPageLineHead = document.createElement("th");
            newPageLineHead.setAttribute("scope", "row");

            const newPageCol1 = document.createElement("td");
            newPageCol1.innerHTML = newPageData[inpAddPageNameId];

            newPage.name = newPageData[inpAddPageNameId]

            const newPageCol2 = document.createElement("td");
            newPageCol2.innerHTML = `/${newPageData[inpAddPageRouteName].toLowerCase()}`;

            newPage.route = newPageData[inpAddPageRouteName]

            const newPageCol3 = document.createElement("td");
            newPageCol3.innerHTML = newPageData[inpAddPageDescriptionName];

            newPage.description = newPageData[inpAddPageDescriptionName]

            const keywords = newPageData[inpAddPageKeywordsName].split(",")
            const keywordsToRemove = []
            for (let i = 0; i < keywords.length; i++) {
                if(keywords[i].spaceStringOnly()) {
                    keywordsToRemove.push(i)
                } else {
                    keywords[i] = keywords[i].trim().leftTrim()
                    if (keywords[i].length == 0) {
                        keywords.splice(i, 1);
                    }
                }
            }

            for (var i = keywordsToRemove.length -1; i >= 0; i--) {
                keywords.splice(keywordsToRemove[i], 1);
            }

            const keywordsToShow = keywords.slice()
            for (let i = 0; i < keywordsToShow.length; i++) {
                keywordsToShow[i] = keywordsToShow[i].replace(" ", "-")
            }

            const newPageCol4 = document.createElement("td");
            newPageCol4.innerHTML = keywordsToShow.join(" ");

            newPage.keywords = keywords

            const newPageCol5 = document.createElement("td");
            newPageCol5.innerHTML = document.querySelector(`input[name="${rdPageTypeName}"]:checked`).parentNode
                .querySelector("label").innerHTML;

            if (listWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)) {
                const checkedPageModel = document.querySelector(`input[name="${rdPageModelName}"]:checked`)
                const item = checkedPageModel.parentNode
                .querySelector("label").innerHTML
                newPageCol5.innerHTML += ` (${item})`
                newPage.item = { "model": item, "id": checkedPageModel.id }
            } else {
                newPage.item = { "model": null, "id": null }
            }

            newPage.type = {
                "id": parseInt(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).value),
                "text": document.querySelector(`input[name="${rdPageTypeName}"]:checked`).parentNode
                    .querySelector("label").innerHTML
            }

            const newPageRemoveButton = document.createElement("button");
            newPageRemoveButton.setAttribute("type", "button");
            newPageRemoveButton.classList.add("btn");
            newPageRemoveButton.classList.add("btn-danger");
            newPageRemoveButton.classList.add("float-end");
            newPageRemoveButton.innerHTML = "Remover";

            const newPageEditButton = document.createElement("button");
            newPageEditButton.setAttribute("type", "button");
            newPageEditButton.classList.add("btn");
            newPageEditButton.classList.add("btn-info");
            newPageEditButton.classList.add("float-end");
            newPageEditButton.classList.add("me-3");
            newPageEditButton.innerHTML = "Editar";

            newPageEditButton.onclick = () => {
                currentEditPage = newPage

                $(`#${mdlAddPageModalId}`).modal('show');
            }

            const newPageCol6 = document.createElement("td");
            newPageCol6.append(newPageRemoveButton)
            newPageCol6.append(newPageEditButton)

            const newPageLine = document.createElement("tr");
            newPageLine.id = newPage.id
            newPageLine.append(newPageLineHead)
            newPageLine.append(newPageCol1)
            newPageLine.append(newPageCol2)
            newPageLine.append(newPageCol3)
            newPageLine.append(newPageCol4)
            newPageLine.append(newPageCol5)
            newPageLine.append(newPageCol6)

            const pagesTableBody = document.getElementById(tblPagesBodyTableId)
            pagesTableBody.append(newPageLine)

            newPageRemoveButton.onclick = () => {
                pages.splice(pages.indexOf(newPage), 1);
                if (pages.length == 0) {
                    showNoPageWarning(true);
                }
                newPageLine.remove();
            }

            showNoPageWarning(false);

            pages.push(newPage)
        }

        $(`#${mdlAddPageModalId}`).modal('hide')
    });
});

export function removePageFromModelId(modelId) {
    const pagesTableBody = document.getElementById(tblPagesBodyTableId)

    const page = pages.find(page => page.item.id == modelId);
    if (page != null) {
        const pageToRemoveIndex = pages.indexOf(page)
        pages.splice(pageToRemoveIndex, 1)
        if (pages.length == 0) {
            showNoPageWarning(true);
        }

        pagesTableBody.childNodes.forEach((tr) => {
            if (tr.id == page.id) {
                tr.remove()
            }
        })
    }
}

export function changePageFromModelChange(modelId, modelName) {
    const pagesTableBody = document.getElementById(tblPagesBodyTableId)

    const page = pages.find(page => page.item.id == modelId);
    if (page != null) {
        page.item.model = modelName
    
        pagesTableBody.childNodes.forEach((tr) => {
            if (tr.id == page.id) {
                tr.childNodes[5].innerHTML = `${page.typeText} (${modelName})`
            }
        })
    }
}

export function getPages() {
    return pages
}

export default { getPages, removePageFromModelId, changePageFromModelChange }