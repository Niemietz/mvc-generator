exports.getModelAddEditFormViewHeadContent = function(page) {
    return `<script type="module" src="<?= DIRJS . '/view/${page.name.capitaliseFirstLetter()}.js' ?>"></script>`
}