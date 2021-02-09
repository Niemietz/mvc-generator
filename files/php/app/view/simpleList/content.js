exports.getText = function() {
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
    <div id="container-table" class="col-12 col-sm-12 col-md-12 col-lg-12 d-none">
        <table id="table-simple" class="table"></table>
    </div>
    <div id="no-item" class="col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Lista vazia!</label>
    </div>
</div>`

    return result
}