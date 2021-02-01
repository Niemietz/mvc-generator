exports.getSimpleViewHeader = function() {
    return `<?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>`
}