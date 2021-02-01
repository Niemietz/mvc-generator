exports.getModelAddFormViewHeader = function(page) {
    return `<?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-dark">
        <h1>Adicionar ${page.item.name.capitaliseFirstLetter()}</h1>
    </div>
</div>`
}