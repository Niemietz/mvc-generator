import { showMessage } from '/javascripts/views/index.js';
import getModels from '/javascripts/tabs/model-adder.js';

const mdlAddPageModalId = "add-page-modal";
const btnAddPageId = "add-page";
const tblPagesBodyTableId = "pages-body-table";
const frmAddPageFormId = "add-page-form";
const divPagesId = "pages-list";
const divNoPageId = "no-page-warning";
const rdPageTypeName = "page-type";

const inpAddPageNameId = "name";
const inpAddPageRouteId = "route";
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
const insertEditFormWithItemIds = [
    rdPageInsertFormId,
    rdPageInsertEditFormId
]
const listWithItemIds = [
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
let afterPageFormValidation = null

function fillAddPageModal(data) {
    document.getElementById(frmAddPageFormId)[inpAddPageNameId].value = data["name"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageRouteName].value = data["route"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageDescriptionName].value = data["description"]
    
    document.getElementById(frmAddPageFormId)[inpAddPageKeywordsName].value = data["keywords"].joinKeywords(",")

    const typeCheckbox = document.getElementById(frmAddPageFormId).querySelector(`input[value="${data["type"]["id"]}"]`)
    typeCheckbox.click()

    if (listWithItemIds.includes(typeCheckbox.id) || insertEditFormWithItemIds.includes(typeCheckbox.id)) {
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
    // Fetch the form we want to apply custom Bootstrap validation styles to
    const form = document.getElementById(frmAddPageFormId);

    // Validate and prevent form submission
    form.onsubmit = function(event){
        event.preventDefault();
        event.stopPropagation();
        const validate = this.checkValidity()
        
        if (afterPageFormValidation != null) {
            afterPageFormValidation(event, validate)
        }
    };

    document.getElementById(inpAddPageNameId).onfocus = function(event) {
        if(event.relatedTarget.id == btnAddPageId) {
            const validate = this.checkValidity()
            if (!validate) {
                showMessage("Verifique os campos não preenchidos!", 2)
            }
        }
    }

    document.getElementById(inpAddPageRouteId).onfocus = function(event) {
        if(event.relatedTarget.id == btnAddPageId) {
            const validate = this.checkValidity()
            if (!validate) {
                showMessage("Verifique os campos não preenchidos!", 2)
            }
        }
    }

    document.getElementsByName(rdPageTypeName).forEach((radio) => {
        radio.onclick = function(ev) {
            if (listWithItemIds.includes(this.id) || insertEditFormWithItemIds.includes(this.id)) {
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
        document.getElementById(inpAddPageModelsTableId).querySelectorAll("div").forEach((childNode) => {
            childNode.remove()
        })

        const models = getModels()

        document.getElementsByName(rdPageTypeName).forEach((radio) => {
            if (listWithItemIds.includes(radio.id)
            && models.find(obj => obj.hasList == true) != null) {
                radio.removeAttribute("disabled")
            } else if (listWithItemIds.includes(radio.id)) {
                radio.setAttribute("disabled", true)
            } else if (insertEditFormWithItemIds.includes(radio.id)
            && models.length > 0) {
                radio.removeAttribute("disabled")
            } else if (insertEditFormWithItemIds.includes(radio.id)) {
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
        afterPageFormValidation = function (event, validate) {

            const newPageData = $(`#${frmAddPageFormId}`).serializeFormJSON(false);

            if (newPageData[inpAddPageNameId].hasSpace()) {
                showMessage(`O nome "${newPageData[inpAddPageNameId]}" não pode conter espaços!`, 3)
                validate = false;
            }
            if (newPageData[inpAddPageRouteName].hasSpace()) {
                showMessage(`A rota "${newPageData[inpAddPageRouteName]}" não pode conter espaços!`, 3)
                validate = false;
            }

            if (validate) {
                if (currentEditPage != null) {
                    currentEditPage.name = newPageData[inpAddPageNameId]

                    currentEditPage.route = newPageData[inpAddPageRouteName]

                    currentEditPage.description = newPageData[inpAddPageDescriptionName]

                    const keywords = newPageData[inpAddPageKeywordsName]

                    currentEditPage.keywords = keywords.splitAndTrim(",")

                    currentEditPage.type = parseInt(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).value)

                    const tableLine = document.getElementById(currentEditPage.id)
                    const type = document.querySelector(`input[name="${rdPageTypeName}"]:checked`).parentNode
                    .querySelector("label").innerHTML

                    currentEditPage.type = {
                        "id": parseInt(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).value),
                        "text": type
                    }

                    if (listWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)
                    || insertEditFormWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)) {
                        const checkedPageModel = document.querySelector(`input[name="${rdPageModelName}"]:checked`)
                        const item = checkedPageModel.parentNode.querySelector("label").innerHTML
                        tableLine.childNodes[5].innerHTML = `${type} (${item})`
                        const models = getModels()
                        const model = models.find(obj => obj.id == checkedPageModel.id)
                        if (model != null) {
                            currentEditPage.item = model
                        } else {
                            currentEditPage.item = null
                        }
                    } else {
                        tableLine.childNodes[5].innerHTML = `${type}`
                        currentEditPage.item = null
                    }

                    tableLine.childNodes[1].innerHTML = currentEditPage.name
                    tableLine.childNodes[2].innerHTML = `/${currentEditPage.route.toLowerCase()}`
                    tableLine.childNodes[3].innerHTML = currentEditPage.description
                    tableLine.childNodes[4].innerHTML = currentEditPage.keywords.joinKeywords(" ")
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

                    const keywords = newPageData[inpAddPageKeywordsName]
                    newPage.keywords = keywords.splitAndTrim(",")

                    const newPageCol4 = document.createElement("td");
                    newPageCol4.innerHTML = newPage.keywords.joinKeywords(" ");

                    const newPageCol5 = document.createElement("td");
                    newPageCol5.innerHTML = document.querySelector(`input[name="${rdPageTypeName}"]:checked`).parentNode
                        .querySelector("label").innerHTML;

                    if (listWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)
                    || insertEditFormWithItemIds.includes(document.querySelector(`input[name="${rdPageTypeName}"]:checked`).id)) {
                        const checkedPageModel = document.querySelector(`input[name="${rdPageModelName}"]:checked`)
                        const item = checkedPageModel.parentNode
                        .querySelector("label").innerHTML
                        newPageCol5.innerHTML += ` (${item})`
                        const models = getModels()
                        const model = models.find(obj => obj.id == checkedPageModel.id)
                        if (model != null) {
                            newPage.item = model
                        } else {
                            newPage.item = null
                        }
                    } else {
                        newPage.item = null
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
            }
        }

        document.getElementById(frmAddPageFormId).submitLikeInputPress()
    });
});

export function removePageFromModelId(modelId, modelName) {
    const page = pages.find(page => page.item.id == modelId);
    if (page != null) {
        const pageToRemoveIndex = pages.indexOf(page)
        pages.splice(pageToRemoveIndex, 1)
        if (pages.length == 0) {
            showNoPageWarning(true);
        }

        const pagesTableBody = document.getElementById(tblPagesBodyTableId)

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