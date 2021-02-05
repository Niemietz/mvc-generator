exports.getText = function() {
    return `<script type="module" src="<?= DIRJS . '/view/${page.name.capitaliseFirstLetter()}.js' ?>"></script>
    <?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>`
}