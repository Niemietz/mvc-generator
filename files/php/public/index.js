exports.getText = function() {
    let result =
`<?php
if(phpversion() >= 5.4)
{
    header("Content-Type: text/html; charset=utf-8");
    require_once("../config/config.php");
    require_once("../src/vendor/autoload.php");

    $dispatch = new App\\Dispatch();
}
else
{
?>
    <h3>É necessário PHP na versão 5.4 ou superior</h3>
<?php
}
?>`

    return result
}