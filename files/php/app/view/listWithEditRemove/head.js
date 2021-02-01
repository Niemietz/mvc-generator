exports.getListWithEditRemoveHeadText = function(page) {
    let result =
`<script type="module" src="<?= DIRJS . '/view/${page.name.capitaliseFirstLetter()}.js' ?>"></script>`

    return result
}