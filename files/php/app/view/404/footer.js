exports.getText = function() {
    return `<?php
    if(file_exists(DIRREQ . "app/view/footer.php"))
    {
        include(DIRREQ . "app/view/footer.php");
    }
?>`
}