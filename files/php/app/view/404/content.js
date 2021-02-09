exports.getText = function() {
    let result =
`<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
    <?php
        if (USE404BREADCRUMB) {
            $breadcrumb = new Src\\Classes\\Breadcrumb();
            $breadcrumb->add404Breadcrumb();
        }
    ?>
    </div>
</div>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-dark">
        <h3>Desculpe, mas não foi possível encontrar a página solicitada.</h3>
    </div>
</div>`

    return result;
}