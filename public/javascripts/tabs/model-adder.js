import { showMessage } from '/javascripts/views/index.js';
import { removePageFromModelId, changePageFromModelChange } from '/javascripts/tabs/page-adder.js';

const mdlAddModelModalId = "add-model-modal";
const btnAddModelId = "add-model";
const btnAddModelAttributeId = "add-attribute";
const tblModelsBodyTableId = "models-body-table";
const tblModelBodyTableId = "model-body-table";
const frmAddModelFormId = "add-model-form";
const divModelsId = "models-list";
const divNoModelId = "no-model-warning";

const inpAddModelName = "name";
const inpAddModelNameId = "model-name";
const inpAddModelAttribute = "attribute";
const inpAddModelColumnName = "column-name";
const selAttributeTypeId = "attribute-type";
const selAttributeTypeName = "attribute-type";
const inpAddModelHasListName = "has-list";
const inpAddModelSelect = "select";
const inpAddModelUpdate = "update";
const inpAddModelInsert = "insert";
const inpAddModelDelete = "delete";

const models = []
let currentEditModel = null
let afterFormValidation = null

function addNewModelAttributeLine(attribute, columnName, type) {
    const newModelAttributeInput = document.createElement("input");
    newModelAttributeInput.id = generateUid()
    newModelAttributeInput.setAttribute("name", inpAddModelAttribute);
    newModelAttributeInput.setAttribute("type", "text");
    newModelAttributeInput.setAttribute("placeholder", "Atributo");
    newModelAttributeInput.classList.add("form-control")
    if (attribute != null && attribute.length > 0) {
        newModelAttributeInput.value = attribute
    }
    
    const newModelAttributeLabel = document.createElement("label");
    newModelAttributeLabel.setAttribute("for", newModelAttributeInput.id)
    newModelAttributeLabel.classList.add("form-label")
    
    const newModelAttributeInvalidLabel = document.createElement("div");
    newModelAttributeInvalidLabel.classList.add("invalid-feedback")
    newModelAttributeInvalidLabel.innerHTML = "Campo obrigatório"

    const newModelAttributeDiv = document.createElement("div");
    newModelAttributeDiv.append(newModelAttributeInput)
    newModelAttributeDiv.append(newModelAttributeLabel)
    newModelAttributeDiv.append(newModelAttributeInvalidLabel)
    
    const newModelAttributeColumn = document.createElement("td");
    newModelAttributeColumn.append(newModelAttributeDiv)
    
    const newModelColumnNameInput = document.createElement("input");
    newModelColumnNameInput.id = generateUid();
    newModelColumnNameInput.setAttribute("name", inpAddModelColumnName);
    newModelColumnNameInput.setAttribute("type", "text");
    newModelColumnNameInput.setAttribute("placeholder", "atributo");
    newModelColumnNameInput.classList.add("form-control")
    if (columnName != null && columnName.length > 0) {
        newModelColumnNameInput.value = columnName
    }

    const newModelColumnNameLabel = document.createElement("label");
    newModelColumnNameLabel.setAttribute("for", newModelColumnNameInput.id)
    newModelColumnNameLabel.classList.add("form-label")
    
    const newModelColumnNameInvalidLabel = document.createElement("div");
    newModelColumnNameInvalidLabel.classList.add("invalid-feedback")
    newModelColumnNameInvalidLabel.innerHTML = "Campo obrigatório"

    const newModelColumnNameDiv = document.createElement("div");
    newModelColumnNameDiv.append(newModelColumnNameInput)
    newModelColumnNameDiv.append(newModelColumnNameLabel)
    newModelColumnNameDiv.append(newModelColumnNameInvalidLabel)
    
    const newModelColumnNameColumn = document.createElement("td");
    newModelColumnNameColumn.append(newModelColumnNameDiv)

    const attributeTypes = [
        "Integer",
        "String",
        "Boolean",
        "Float",
        "Double",
        "Char"
    ]

    const newModelAttributeTypeSelect = document.createElement("select");
    newModelAttributeTypeSelect.setAttribute("id", selAttributeTypeId);
    newModelAttributeTypeSelect.setAttribute("name", selAttributeTypeName);
    newModelAttributeTypeSelect.classList.add("form-select");

    attributeTypes.forEach((attributeType, index) => {
        const newModelAttributeType = document.createElement("option");
        newModelAttributeType.setAttribute("value", index + 1);
        newModelAttributeType.innerHTML = attributeType

        if (type != null && type > 0 && type == (index + 1)) {
            newModelAttributeType.setAttribute("selected", true)
            newModelAttributeType.selected = true
        } else if (type == null && index == 0) {
            newModelAttributeType.setAttribute("selected", true)
            newModelAttributeType.selected = true
        }

        newModelAttributeTypeSelect.append(newModelAttributeType)
    })
    
    newModelAttributeTypeSelect.onchange = function(ev) {
        const selected = this.querySelector(`option[value="${this.value}"]`)
        selected.setAttribute("selected", true)
        this.childNodes.forEach((node) => {
            if (node != selected) {
                node.removeAttribute("selected")
            }
        })
    }
    
    const newModelAttributeTypeColumn = document.createElement("td");
    newModelAttributeTypeColumn.append(newModelAttributeTypeSelect)

    const newModelRemoveButtonIcon = document.createElement("i");
    newModelRemoveButtonIcon.classList.add("fas");
    newModelRemoveButtonIcon.classList.add("fa-lg");
    newModelRemoveButtonIcon.classList.add("fa-minus");

    const newModelRemoveButton = document.createElement("a");
    newModelRemoveButton.classList.add("btn");
    newModelRemoveButton.classList.add("btn-rounded");
    newModelRemoveButton.classList.add("btn-light");
    newModelRemoveButton.append(newModelRemoveButtonIcon);

    const newModelRemoveColumn = document.createElement("td");
    newModelRemoveColumn.append(newModelRemoveButton)

    const newModelAttributeLine = document.createElement("tr");
    newModelAttributeLine.append(newModelAttributeColumn)
    newModelAttributeLine.append(newModelColumnNameColumn)
    newModelAttributeLine.append(newModelAttributeTypeColumn)
    newModelAttributeLine.append(newModelRemoveColumn)

    const modelTableBody = document.getElementById(tblModelBodyTableId)
    modelTableBody.append(newModelAttributeLine)
    
    newModelRemoveButton.onclick = () => {
        if (modelTableBody.querySelectorAll("tr").length > 1) {
            newModelAttributeLine.remove();
        } else {
            showMessage("Toda classe / model deve conter ao menos atributo!", 2)
        }
    }
}

function fillAddModelModal(data) {
    $(`#${tblModelBodyTableId}`).empty()

    document.getElementById(frmAddModelFormId)[inpAddModelName].value = data["name"]

    for (let i = 0; i < data["attributesAndColumnNames"].length; i++) {
        const attribute = data["attributesAndColumnNames"][i]["attribute"]
        const columnName = data["attributesAndColumnNames"][i]["columnName"]
        const type = data["attributesAndColumnNames"][i]["type"]["id"]

        addNewModelAttributeLine(attribute, columnName, type)
    }

    if (data["select"]) {
        document.getElementById(frmAddModelFormId)[inpAddModelSelect].setAttribute("checked", true)
    } else {
        document.getElementById(frmAddModelFormId)[inpAddModelSelect].removeAttribute("checked")
    }

    if (data["update"]) {
        document.getElementById(frmAddModelFormId)[inpAddModelUpdate].setAttribute("checked", true)
    } else {
        document.getElementById(frmAddModelFormId)[inpAddModelUpdate].removeAttribute("checked")
    }

    if (data["insert"]) {
        document.getElementById(frmAddModelFormId)[inpAddModelInsert].setAttribute("checked", true)
    } else {
        document.getElementById(frmAddModelFormId)[inpAddModelInsert].removeAttribute("checked")
    }

    if (data["delete"]) {
        document.getElementById(frmAddModelFormId)[inpAddModelDelete].setAttribute("checked", true)
    } else {
        document.getElementById(frmAddModelFormId)[inpAddModelDelete].removeAttribute("checked")
    }

    if (data["hasList"]) {
        document.getElementById(frmAddModelFormId)[inpAddModelHasListName].setAttribute("checked", true)
    } else {
        document.getElementById(frmAddModelFormId)[inpAddModelHasListName].removeAttribute("checked")
    }

    $(`#${btnAddModelId}`).text("Editar");
}

function resetAddModelModal() {
    $(`#${tblModelBodyTableId}`).empty()

    addNewModelAttributeLine()

    document.getElementById(frmAddModelFormId).reset()

    const selectCheck = document.getElementById(frmAddModelFormId)[inpAddModelSelect]
    selectCheck.setAttribute("checked", true)
    selectCheck.value = "1"

    const updateCheck = document.getElementById(frmAddModelFormId)[inpAddModelUpdate]
    updateCheck.setAttribute("checked", true)
    updateCheck.value = "1"

    const insertCheck = document.getElementById(frmAddModelFormId)[inpAddModelInsert]
    insertCheck.setAttribute("checked", true)
    insertCheck.value = "1"

    const deleteCheck = document.getElementById(frmAddModelFormId)[inpAddModelDelete]
    deleteCheck.setAttribute("checked", true)
    deleteCheck.value = "1"

    const hasListCheck = document.getElementById(frmAddModelFormId)[inpAddModelHasListName]
    hasListCheck.removeAttribute("checked")
    hasListCheck.value = "0"

    $(`#${btnAddModelId}`).text("Adicionar")
}

function showNoModelWarning(show) {
    if (show) {
        $(`#${divNoModelId}`).removeClass("d-none")
        $(`#${divModelsId}`).addClass("d-none")
    } else {
        $(`#${divNoModelId}`).addClass("d-none")
        $(`#${divModelsId}`).removeClass("d-none")
    }
}

$(document).ready(function()
{
    // Fetch the form we want to apply custom Bootstrap validation styles to
    const form = document.getElementById(frmAddModelFormId);

    // Validate and prevent form submission
    form.onsubmit = function(event){
        event.preventDefault();
        event.stopPropagation();
        const validate = form.checkValidity()
        
        if (afterFormValidation != null) {
            afterFormValidation(event, validate)
        }
    };

    document.getElementById(inpAddModelNameId).onfocus = function(event) {
        if(event.relatedTarget.id == btnAddModelId) {
            const validate = this.checkValidity()
            if (!validate) {
                showMessage("Verifique os campos não preenchidos!", 2)
            }
        }
    }

    addNewModelAttributeLine()

    const addModelForm = document.getElementById(frmAddModelFormId)
    const selectCheckbox = addModelForm[inpAddModelSelect]
    selectCheckbox.onchange = () => {
        if(selectCheckbox.checked) {
            selectCheckbox.value = "1"
        } else {
            selectCheckbox.value = "0"
        }
    }
    const updateCheckbox = addModelForm[inpAddModelUpdate]
    updateCheckbox.onchange = () => {
        if(updateCheckbox.checked) {
            updateCheckbox.value = "1"
        } else {
            updateCheckbox.value = "0"
        }
    }
    const insertCheckbox = addModelForm[inpAddModelInsert]
    insertCheckbox.onchange = () => {
        if(insertCheckbox.checked) {
            insertCheckbox.value = "1"
        } else {
            insertCheckbox.value = "0"
        }
    }
    const deleteCheckbox = addModelForm[inpAddModelDelete]
    deleteCheckbox.onchange = () => {
        if(deleteCheckbox.checked) {
            deleteCheckbox.value = "1"
        } else {
            deleteCheckbox.value = "0"
        }
    }
    const hasListCheckbox = addModelForm[inpAddModelHasListName]
    hasListCheckbox.onchange = () => {
        if(hasListCheckbox.checked) {
            hasListCheckbox.value = "1"
        } else {
            hasListCheckbox.value = "0"
        }
    }

    $(`#${mdlAddModelModalId}`).on('shown.bs.modal', function(e) {
        if (currentEditModel != null) {
            fillAddModelModal(currentEditModel)
        }
    })

    $(`#${mdlAddModelModalId}`).on('hidden.bs.modal', function (e) {
        resetAddModelModal()

        currentEditModel = null
    })

    $(`#${btnAddModelAttributeId}`).click(function(e)
    {
        addNewModelAttributeLine()
    });

    $(`#${btnAddModelId}`).click(function(e)
    {
        afterFormValidation = function (event, validate) {
            if (validate) {
                const newModelData = $(`#${frmAddModelFormId}`).serializeFormJSON(false);

                if (!Array.isArray(newModelData[inpAddModelAttribute])) {
                    newModelData[inpAddModelAttribute] = [
                        newModelData[inpAddModelAttribute]
                    ]
                }

                if (!Array.isArray(newModelData[inpAddModelColumnName])) {
                        newModelData[inpAddModelColumnName] = [
                            newModelData[inpAddModelColumnName]
                        ]
                }

                if (!Array.isArray(newModelData[selAttributeTypeName])) {
                        newModelData[selAttributeTypeName] = [
                            newModelData[selAttributeTypeName]
                        ]
                }

                if (newModelData[inpAddModelSelect] == "1") {
                    newModelData[inpAddModelSelect] = true
                } else {
                    newModelData[inpAddModelSelect] = false
                }

                if (newModelData[inpAddModelUpdate] == "1") {
                    newModelData[inpAddModelUpdate] = true
                } else {
                    newModelData[inpAddModelUpdate] = false
                }

                if (newModelData[inpAddModelInsert] == "1") {
                    newModelData[inpAddModelInsert] = true
                } else {
                    newModelData[inpAddModelInsert] = false
                }

                if (newModelData[inpAddModelDelete] == "1") {
                    newModelData[inpAddModelDelete] = true
                } else {
                    newModelData[inpAddModelDelete] = false
                }

                if (newModelData[inpAddModelHasListName] == "1") {
                    newModelData[inpAddModelHasListName] = true
                } else {
                    newModelData[inpAddModelHasListName] = false
                }

                if (currentEditModel != null) {
                    currentEditModel.name = newModelData[inpAddModelName]

                    const typeText = document.getElementById(selAttributeTypeId).querySelector('option[selected="true"]').innerHTML

                    currentEditModel.attributesAndColumnNames = []
                    for(let i = 0; i < newModelData[inpAddModelAttribute].length; i++) {
                        currentEditModel.attributesAndColumnNames.push({
                            "attribute": newModelData[inpAddModelAttribute][i],
                            "columnName": newModelData[inpAddModelColumnName][i],
                            "type": {
                                "id": parseInt(newModelData[selAttributeTypeName][i]),
                                "text": typeText
                            }
                        })
                    }

                    currentEditModel.select = newModelData[inpAddModelSelect]

                    currentEditModel.update = newModelData[inpAddModelUpdate]

                    currentEditModel.insert = newModelData[inpAddModelInsert]

                    currentEditModel.delete = newModelData[inpAddModelDelete]

                    currentEditModel.hasList = newModelData[inpAddModelHasListName]

                    const tableLine = document.getElementById(currentEditModel.id)
                    tableLine.childNodes[1].innerHTML = `${currentEditModel.name} (${typeText})`
                    const selectCheck = tableLine.childNodes[2].querySelector(".select")
                    if (currentEditModel.select) {
                        selectCheck.setAttribute("checked", true)
                    } else {
                        selectCheck.removeAttribute("checked")
                    }
                    const updateCheck = tableLine.childNodes[2].querySelector(".update")
                    if (currentEditModel.update) {
                        updateCheck.setAttribute("checked", true)
                    } else {
                        updateCheck.removeAttribute("checked")
                    }
                    const insertCheck = tableLine.childNodes[2].querySelector(".insert")
                    if (currentEditModel.insert) {
                        insertCheck.setAttribute("checked", true)
                    } else {
                        insertCheck.removeAttribute("checked")
                    }
                    const deleteCheck = tableLine.childNodes[2].querySelector(".delete")
                    if (currentEditModel.delete) {
                        deleteCheck.setAttribute("checked", true)
                    } else {
                        deleteCheck.removeAttribute("checked")
                    }
                    const hasListCheck = tableLine.childNodes[3].querySelector(".has-list")
                    if (currentEditModel.hasList) {
                        hasListCheck.setAttribute("checked", true)
                    } else {
                        hasListCheck.removeAttribute("checked")
                    }

                    changePageFromModelChange(currentEditModel.id, currentEditModel.name)
                } else {
                    let newModel = {}

                    newModel.id = generateUid();

                    const newModelLineHead = document.createElement("th");
                    newModelLineHead.setAttribute("scope", "row");

                    const typeText = document.getElementById(selAttributeTypeId).querySelector('option[selected="true"]').innerHTML

                    const newModelCol1 = document.createElement("td");
                    newModelCol1.innerHTML = `${newModelData[inpAddModelName]} (${typeText})`;

                    newModel.name = newModelData[inpAddModelName]

                    newModel.attributesAndColumnNames = []
                    for(let i = 0; i < newModelData[inpAddModelAttribute].length; i ++) {
                        newModel.attributesAndColumnNames.push({
                            "attribute": newModelData[inpAddModelAttribute][i],
                            "columnName": newModelData[inpAddModelColumnName][i],
                            "type": {
                                "id": parseInt(newModelData[selAttributeTypeName][i]),
                                "text": typeText
                            }
                        })
                    }

                    const newModelCheckSelect = document.createElement("input");
                    newModelCheckSelect.setAttribute("type", "checkbox")
                    newModelCheckSelect.setAttribute("disabled", true)
                    newModelCheckSelect.classList.add("select")
                    newModelCheckSelect.classList.add("form-check-input")
                    if (newModelData[inpAddModelSelect]) {
                        newModelCheckSelect.setAttribute("checked", true)
                        newModelCheckSelect.value = "1"
                    } else {
                        newModelCheckSelect.value = "0"
                    }

                    newModel.select = newModelData[inpAddModelSelect]

                    const newModelCheckSelectLabel = document.createElement("label");
                    newModelCheckSelectLabel.classList.add("form-check-label")
                    newModelCheckSelectLabel.innerHTML = "Select"

                    const newModelCheckSelectDiv = document.createElement("div");
                    newModelCheckSelectDiv.classList.add("form-check")
                    newModelCheckSelectDiv.classList.add("form-check-inline")

                    newModelCheckSelectDiv.append(newModelCheckSelect)
                    newModelCheckSelectDiv.append(newModelCheckSelectLabel)

                    const newModelCheckUpdate = document.createElement("input");
                    newModelCheckUpdate.setAttribute("type", "checkbox")
                    newModelCheckUpdate.setAttribute("disabled", true)
                    newModelCheckUpdate.classList.add("update")
                    newModelCheckUpdate.classList.add("form-check-input")
                    if (newModelData[inpAddModelUpdate]) {
                        newModelCheckUpdate.setAttribute("checked", true)
                        newModelCheckUpdate.value = "1"
                    } else {
                        newModelCheckUpdate.value = "0"
                    }

                    newModel.update = newModelData[inpAddModelUpdate]

                    const newModelCheckUpdateLabel = document.createElement("label");
                    newModelCheckUpdateLabel.classList.add("form-check-label")
                    newModelCheckUpdateLabel.innerHTML = "Update"

                    const newModelCheckUpdateDiv = document.createElement("div");
                    newModelCheckUpdateDiv.classList.add("form-check")
                    newModelCheckUpdateDiv.classList.add("form-check-inline")

                    newModelCheckUpdateDiv.append(newModelCheckUpdate)
                    newModelCheckUpdateDiv.append(newModelCheckUpdateLabel)

                    const newModelCheckInsert = document.createElement("input");
                    newModelCheckInsert.setAttribute("type", "checkbox")
                    newModelCheckInsert.setAttribute("disabled", true)
                    newModelCheckInsert.classList.add("insert")
                    newModelCheckInsert.classList.add("form-check-input")
                    if (newModelData[inpAddModelInsert]) {
                        newModelCheckInsert.setAttribute("checked", true)
                        newModelCheckInsert.value = "1"
                    } else {
                        newModelCheckInsert.value = "0"
                    }

                    newModel.insert = newModelData[inpAddModelInsert]

                    const newModelCheckInsertLabel = document.createElement("label");
                    newModelCheckInsertLabel.classList.add("form-check-label")
                    newModelCheckInsertLabel.innerHTML = "Insert"

                    const newModelCheckInsertDiv = document.createElement("div");
                    newModelCheckInsertDiv.classList.add("form-check")
                    newModelCheckInsertDiv.classList.add("form-check-inline")

                    newModelCheckInsertDiv.append(newModelCheckInsert)
                    newModelCheckInsertDiv.append(newModelCheckInsertLabel)

                    const newModelCheckDelete = document.createElement("input");
                    newModelCheckDelete.setAttribute("type", "checkbox")
                    newModelCheckDelete.setAttribute("disabled", true)
                    newModelCheckDelete.classList.add("delete")
                    newModelCheckDelete.classList.add("form-check-input")
                    if (newModelData[inpAddModelDelete]) {
                        newModelCheckDelete.setAttribute("checked", true)
                        newModelCheckDelete.value = "1"
                    } else {
                        newModelCheckDelete.value = "0"
                    }

                    newModel.delete = newModelData[inpAddModelDelete]

                    const newModelCheckDeleteLabel = document.createElement("label");
                    newModelCheckDeleteLabel.classList.add("form-check-label")
                    newModelCheckDeleteLabel.innerHTML = "Delete"

                    const newModelCheckDeleteDiv = document.createElement("div");
                    newModelCheckDeleteDiv.classList.add("form-check")
                    newModelCheckDeleteDiv.classList.add("form-check-inline")

                    newModelCheckDeleteDiv.append(newModelCheckDelete)
                    newModelCheckDeleteDiv.append(newModelCheckDeleteLabel)

                    const newModelCol2 = document.createElement("td");
                    newModelCol2.append(newModelCheckSelectDiv)
                    newModelCol2.append(newModelCheckUpdateDiv)
                    newModelCol2.append(document.createElement("br"))
                    newModelCol2.append(newModelCheckInsertDiv)
                    newModelCol2.append(newModelCheckDeleteDiv)

                    const newModelCheckHasList = document.createElement("input");
                    newModelCheckHasList.setAttribute("type", "checkbox")
                    newModelCheckHasList.setAttribute("disabled", true)
                    newModelCheckHasList.classList.add("has-list")
                    newModelCheckHasList.classList.add("form-check-input")
                    if (newModelData[inpAddModelHasListName]) {
                        newModelCheckHasList.setAttribute("checked", true)
                        newModelCheckHasList.value = "1"
                    } else {
                        newModelCheckHasList.value = "0"
                    }

                    newModel.hasList = newModelData[inpAddModelHasListName]

                    const newModelCheckHasListLabel = document.createElement("label");
                    newModelCheckHasListLabel.classList.add("form-check-label")
                    newModelCheckHasListLabel.innerHTML = "Lista"

                    const newModelCheckHasListDiv = document.createElement("div");
                    newModelCheckHasListDiv.classList.add("form-check")
                    newModelCheckHasListDiv.classList.add("form-check-inline")
                    newModelCheckHasListDiv.append(newModelCheckHasList)
                    newModelCheckHasListDiv.append(newModelCheckHasListLabel)

                    const newModelCol3 = document.createElement("td");
                    newModelCol3.append(newModelCheckHasListDiv)

                    const newModelRemoveButton = document.createElement("button");
                    newModelRemoveButton.setAttribute("type", "button");
                    newModelRemoveButton.classList.add("btn");
                    newModelRemoveButton.classList.add("btn-danger");
                    newModelRemoveButton.classList.add("float-end");
                    newModelRemoveButton.innerHTML = "Remover";

                    const newModelEditButton = document.createElement("button");
                    newModelEditButton.setAttribute("type", "button");
                    newModelEditButton.classList.add("btn");
                    newModelEditButton.classList.add("btn-info");
                    newModelEditButton.classList.add("float-end");
                    newModelEditButton.classList.add("me-3");
                    newModelEditButton.innerHTML = "Editar";

                    newModelEditButton.onclick = () => {
                        currentEditModel = newModel

                        $(`#${mdlAddModelModalId}`).modal('show');
                    }

                    const newModelCol4 = document.createElement("td");
                    newModelCol4.append(newModelRemoveButton)
                    newModelCol4.append(newModelEditButton)

                    const newModelLine = document.createElement("tr");
                    newModelLine.setAttribute("id", newModel.id)
                    newModelLine.append(newModelLineHead)
                    newModelLine.append(newModelCol1)
                    newModelLine.append(newModelCol2)
                    newModelLine.append(newModelCol3)
                    newModelLine.append(newModelCol4)

                    const modelsTableBody = document.getElementById(tblModelsBodyTableId)
                    modelsTableBody.append(newModelLine)

                    newModelRemoveButton.onclick = () => {
                        const modelToRemoveIndex = models.indexOf(newModel)
                        models.splice(modelToRemoveIndex, 1);
                        if (models.length == 0) {
                            showNoModelWarning(true);
                        }
                        removePageFromModelId(newModel.id)
                        newModelLine.remove();
                    }

                    showNoModelWarning(false);

                    models.push(newModel)

                }
                
                $(`#${mdlAddModelModalId}`).modal('hide')
                
                //event.currentTarget.submit()
            }
        }

        document.getElementById(frmAddModelFormId).submitLikeInputPress()
    });
});

export default function() {
    return models;
}