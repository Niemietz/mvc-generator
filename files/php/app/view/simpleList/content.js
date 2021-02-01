exports.getSimpleListContentText = function(page) {
    let result =
`<div class="row">
    <div id="container-table" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <table id="table-simple" class="table"></table>
    </div>
    <div id="no-item" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Lista vazia!</label>
    </div>
</div>`

    return result
}