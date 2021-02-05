String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

exports.getText = function(page) {
    let result =
`<script type="module" src="<?= DIRJS . '/view/${page.name.capitaliseFirstLetter()}.js' ?>"></script>
<?php
if(file_exists(DIRREQ . "app/view/topbar.php"))
{
    include(DIRREQ . "app/view/topbar.php");
}
?>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-dark">
        <h1>${page.item.name.capitaliseFirstLetter()}s</h1>
    </div>
</div>
`

    return result
}