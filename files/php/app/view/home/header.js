exports.getText = function() {
    let result =
`<script type="module" src="<?= DIRJS . '/view/home.js' ?>"></script>
<?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-dark">
        <h1>Página Inicial</h1>
    </div>
</div>`

    return result
}