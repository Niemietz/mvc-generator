import removePageFromModelId from '/javascripts/tabs/page-adder.js';

const mdlAddModelModalId = "add-model-modal";
const btnAddModelId = "add-model";
const btnAddModelAttributeId = "add-attribute";
const tblModelsBodyTableId = "models-body-table";
const tblModelBodyTableId = "model-body-table";
const frmAddModelFormId = "add-model-form";
const divModelsId = "models-list";
const divNoModelId = "no-model-warning";

const inpAddModelName = "name";
const inpAddModelAttribute = "attribute";
const inpAddModelColumnName = "column-name";
const inpAddModelSelect = "select";
const inpAddModelUpdate = "update";
const inpAddModelInsert = "insert";
const inpAddModelDelete = "delete";

const models = []
let currentEditModel = null

function addNewModelAttributeLine(attribute, columnName) {
    const newModelAttributeInput = document.createElement("input");
    newModelAttributeInput.setAttribute("name", inpAddModelAttribute);
    newModelAttributeInput.setAttribute("type", "text");
    newModelAttributeInput.setAttribute("placeholder", "Atributo");
    newModelAttributeInput.classList.add("form-control")
    if (attribute != null && attribute.length > 0) {
        newModelAttributeInput.value = attribute
    }

    const newModelAttributeColumn = document.createElement("td");
    newModelAttributeColumn.append(newModelAttributeInput)
    
    const newModelColumnNameInput = document.createElement("input");
    newModelColumnNameInput.setAttribute("name", inpAddModelColumnName);
    newModelColumnNameInput.setAttribute("type", "text");
    newModelColumnNameInput.setAttribute("placeholder", "atributo");
    newModelColumnNameInput.classList.add("form-control")
    if (columnName != null && columnName.length > 0) {
        newModelColumnNameInput.value = columnName
    }

    const newModelColumnNameColumn = document.createElement("td");
    newModelColumnNameColumn.append(newModelColumnNameInput)

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
    newModelAttributeLine.append(newModelRemoveColumn)

    const modelTableBody = document.getElementById(tblModelBodyTableId)
    modelTableBody.append(newModelAttributeLine)
    
    newModelRemoveButton.onclick = () => {
        newModelAttributeLine.remove();
    }
}

function fillAddModelModal(data) {
    $(`#${tblModelBodyTableId}`).empty()

    document.getElementById(frmAddModelFormId)[inpAddModelName].value = data["name"]

    for (let i = 0; i < data["attributesAndColumnNames"].length; i++) {
        const attribute = data["attributesAndColumnNames"][i]["attribute"]
        const columnName = data["attributesAndColumnNames"][i]["columnName"]

        addNewModelAttributeLine(attribute, columnName)
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

        if (currentEditModel != null) {
            currentEditModel.name = newModelData[inpAddModelName]

            currentEditModel.attributesAndColumnNames = []
            for(let i = 0; i < newModelData[inpAddModelAttribute].length; i++) {
                currentEditModel.attributesAndColumnNames.push({
                    "attribute": newModelData[inpAddModelAttribute][i],
                    "columnName": newModelData[inpAddModelColumnName][i]
                })
            }

            currentEditModel.select = newModelData[inpAddModelSelect]

            currentEditModel.update = newModelData[inpAddModelUpdate]

            currentEditModel.insert = newModelData[inpAddModelInsert]

            currentEditModel.delete = newModelData[inpAddModelDelete]

            const index = models.indexOf(currentEditModel)

            const tableLine = $($(`#${tblModelsBodyTableId}`).children()[index])
            $(tableLine.children()[1]).text(currentEditModel.name)
            const selectCheck = $(tableLine.children()[2]).find(".select")
            if (currentEditModel.select) {
                selectCheck.attr("checked", true)
            } else {
                selectCheck.removeAttr("checked")
            }
            const updateCheck = $(tableLine.children()[2]).find(".update")
            if (currentEditModel.update) {
                updateCheck.attr("checked", true)
            } else {
                updateCheck.removeAttr("checked")
            }
            const insertCheck = $(tableLine.children()[2]).find(".insert")
            if (currentEditModel.insert) {
                insertCheck.attr("checked", true)
            } else {
                insertCheck.removeAttr("checked")
            }
            const deleteCheck = $(tableLine.children()[2]).find(".delete")
            if (currentEditModel.delete) {
                deleteCheck.attr("checked", true)
            } else {
                deleteCheck.removeAttr("checked")
            }
        } else {
            let newModel = {}

            newModel.id = generateUid();

            const newModelLineHead = document.createElement("th");
            newModelLineHead.setAttribute("scope", "row");

            const newModelCol1 = document.createElement("td");
            newModelCol1.innerHTML = newModelData[inpAddModelName];

            newModel.name = newModelData[inpAddModelName]

            newModel.attributesAndColumnNames = []
            for(let i = 0; i < newModelData[inpAddModelAttribute].length; i ++) {
                newModel.attributesAndColumnNames.push({
                    "attribute": newModelData[inpAddModelAttribute][i],
                    "columnName": newModelData[inpAddModelColumnName][i]
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
                fillAddModelModal(newModel)

                currentEditModel = newModel

                $(`#${mdlAddModelModalId}`).modal('show');
            }

            const newModelCol3 = document.createElement("td");
            newModelCol3.append(newModelRemoveButton)
            newModelCol3.append(newModelEditButton)

            const newModelLine = document.createElement("tr");
            newModelLine.append(newModelLineHead)
            newModelLine.append(newModelCol1)
            newModelLine.append(newModelCol2)
            newModelLine.append(newModelCol3)

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
    });
});

export default function() {
    return models;
}