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
`<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
    <?php
        /*if (USEBREADCRUMB) {
            $breadcrumb = new Src\\Classes\\Breadcrumb();
            $breadcrumb->addBreadcrumb();
        }*/
    ?>
    </div>
</div>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#mdl-add-edit-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}">
            Adicionar
        </button>
    </div>
</div>
<div class="row mt-3">
    <div id="container-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s" class="col-12 col-sm-12 col-md-12 col-lg-12 d-none">
        <table id="table-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" class="table"></table>
    </div>
    <div id="no-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}s" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nenhum(a) ${page.item.name.capitaliseFirstLetter()}s encontrado(a)!</label>
    </div>
</div>`

    return result
}