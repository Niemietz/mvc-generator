exports.getModelAddEditFormViewContentText = function(page) {
    let result =
`<form id="form-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}">
`
    page.item.attributesAndColumnNames.forEach((item, index) => {
        if (index % 3 == 0 || index == 0) {
            result +=
`    <div class="row">`
        }

        if (item.type.id == 2 || item.type.id == 6) {
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control"
<?php
if ($_GET["id"] != null && $_GET["id"] > -1) {
?>
    value="
<?php echo $_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]; ?>
    "
<?php
}
?>
                />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 1) {
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="number" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control"
<?php
if ($_GET["id"] != null && $_GET["id"] > -1) {
?>
    value="
<?php echo $_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]; ?>
    "
<?php
}
?>
                />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 4 || item.type.id == 5) {    // TODO Needs to add a decimal mask
            result +=
`        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-outline">
                <input name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" type="text" id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}" class="form-control"
<?php
if ($_GET["id"] != null && $_GET["id"] > -1) {
?>
    value="
<?php echo $_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]; ?>
    "
<?php
}
?>
                />
                <label class="form-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">${item.attribute.capitaliseFirstLetter()}</label>
            </div>
        </div>`
        } else if (item.type.id == 3) {
            result +=
`       <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    name="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"
                    id="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"        
<?php
if ($_GET["id"] != null && $_GET["id"] > -1) {
?>
    value="
<?php echo ($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]) ? "1" : "0"; ?>
    "
<?php
} else {
?>
    value="0"
<?php
}
?>
                />
                <label class="form-check-label" for="${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}">
                    ${item.attribute.capitaliseFirstLetter()}
                </label>
            </div>
        </div>`
        }

        if (index % 3 == 0 || index == 0) {
            result +=
`    </div>`
        }
    })

    result +=
`</form>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
<?php
if ($_GET["id"] != null && $_GET["id"] > -1) {
?>
        <button id="edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" type="button" class="btn btn-warning" ${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}Id="<?php $_GET["id"] ?>">Atualizar</button>
<?php
} else {
?>
        <button id="add-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" type="button" class="btn btn-success">Adicionar</button>
<?php
}
?>
    </div>
</div>`

    return result
}