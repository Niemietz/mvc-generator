String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

exports.getText = function(page) {
    return `<script type="module" src="<?= DIRJS . '/view/${page.name.capitaliseFirstLetter().replaceAll("-", "_")}.js' ?>"></script>
    <?php
    if(file_exists(DIRREQ . "app/view/topbar.php"))
    {
        include(DIRREQ . "app/view/topbar.php");
    }
?>
<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-dark">
        <h1>Adicionar / Editar ${page.item.name.capitaliseFirstLetter()}</h1>
    </div>
</div>`
}