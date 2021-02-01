exports.getListWithAddContentText = function(page) {
    let result =
`<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#mdl-add-${page.item.name.replaceAt(0, item.page.item.name.charAt(0).toLowerCase())}">
            Adicionar
        </button>
    </div>
</div>
<div class="row">
    <div id="container-${page.item.name.capitaliseFirstLetter()}s" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <table id="table-${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}" class="table"></table>
    </div>
    <div id="no-${page.item.name.capitaliseFirstLetter()}s" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nenhum(a) ${page.item.name.capitaliseFirstLetter()}s encontrado(a)!</label>
    </div>
</div>`

    return result
}