exports.getText = function() {
    let result =
`<script type="module" src="<?= DIRJS . '/view/home.js' ?>"></script>
<?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>`

    return result
}