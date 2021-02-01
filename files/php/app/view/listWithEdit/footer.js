exports.getListWithEditFooterText = function() {
    let result =
`<?php
if(file_exists(DIRREQ . "app/view/footer.php"))
{
    include(DIRREQ . "app/view/footer.php");
}
?>`

    return result
}