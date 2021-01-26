export default function(author, framework) {
    let result = 
`<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="${author}">
        <meta name="description" content="<?php echo $this->getDescription(); ?>">
        <meta name="keywords" content="<?php echo $this->getKeywords(); ?>">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><?php echo $this->getTitle(); ?></title>

        <link rel="shortcut icon" sizes="16x16" href="<?= DIRFAVICON . "/16x16/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="shortcut icon" sizes="16x16" type="image/png" href="<?= DIRFAVICON . "/16x16/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="16x16" type="image/vnd.microsoft.icon" href="<?= DIRFAVICON . "/16x16/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="16x16" type="image/x-icon" href="/<?= DIRFAVICON . "/16x16/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="16x16" href="<?= DIRFAVICON . "/16x16/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="icon" sizes="16x16" type="image/png" href="<?= DIRFAVICON . "/16x16/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">

        <link rel="shortcut icon" sizes="32x32" href="<?= DIRFAVICON . "/32x32/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="shortcut icon" sizes="32x32" type="image/png" href="<?= DIRFAVICON . "/32x32/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="32x32" type="image/vnd.microsoft.icon" href="<?= DIRFAVICON . "/32x32/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="32x32" type="image/x-icon" href="/<?= DIRFAVICON . "/32x32/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="32x32" href="<?= DIRFAVICON . "/32x32/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="icon" sizes="32x32" type="image/png" href="<?= DIRFAVICON . "/32x32/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">

        <link rel="shortcut icon" sizes="64x64" href="<?= DIRFAVICON . "/64x64/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="shortcut icon" sizes="64x64" type="image/png" href="<?= DIRFAVICON . "/64x64/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="64x64" type="image/vnd.microsoft.icon" href="<?= DIRFAVICON . "/64x64/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="64x64" type="image/x-icon" href="/<?= DIRFAVICON . "/64x64/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="64x64" href="<?= DIRFAVICON . "/64x64/favicon.ico" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="icon" sizes="64x64" type="image/png" href="<?= DIRFAVICON . "/64x64/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">

        <link rel="shortcut icon" sizes="96x96" type="image/png" href="<?= DIRFAVICON . "/96x96/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="96x96" type="image/vnd.microsoft.icon" href="<?= DIRFAVICON . "/96x96/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="96x96" type="image/x-icon" href="/<?= DIRFAVICON . "/96x96/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
        <link rel="icon" sizes="96x96" href="<?= DIRFAVICON . "/96x96/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>" />
        <link rel="icon" sizes="96x96" type="image/png" href="<?= DIRFAVICON . "/96x96/favicon.png" . (USECACHE) ? "" : "?v=" . md5(time()); ?>">
`
    if (framework == 1) {
        result += 
        `<link rel="stylesheet" href="<?= DIRCSS . "/all.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . "/bootstrap.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-multiselect.css' ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-autocomplete.css' ?>">
`
    } else if (framework == 2) {
        result += 
        `<link rel="stylesheet" href="<?= DIRCSS . '/mdb.min.css' ?>">
`
    } else if (framework == 3) {
        result += 
        `<link rel="stylesheet" href="<?= DIRCSS . '/materialize.min.css' ?>">
`
    }
    result += 
        `<link rel="stylesheet" href="<?= DIRCSS . "/sweetalert2.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/notiflix-2.7.0.min.css' ?>">

        <link rel="stylesheet" href="<?= DIRCSS . '/custom.css' ?>">

        <script type="text/javascript" src="<?= DIRJS . "/jquery-3.5.1.min.js" ?>"></script>
`
    if (framework == 1) {
        result += 
        `<script type="text/javascript" src="<?= DIRJS . "/bootstrap.bundle.min.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-multiselect.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-autocomplete.js" ?>"></script>
`
    } else if (framework == 2) {
        result += 
        `<script type="text/javascript" src="<?= DIRJS . "/mdb.min.js" ?> "></script>
`
    } else if (framework == 3) {
        result += 
        `<script type="text/javascript" src="<?= DIRJS . "/materialize.min.js" ?> "></script>
`
    }
    result += 
        `<script type="text/javascript" src="<?= DIRJS . "/sweetalert2.all.min.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/notiflix-aio-2.7.0.min.js" ?>"></script>

        <script src="<?= DIRJS . '/commons.js' ?>"></script>
        <script src="<?= DIRJS . '/index.js' ?>"></script>

        <?php echo $this->addHead(); ?>
    </head>
    <body>
        <div>
            <?php echo $this->addHeader(); ?>
        </div>

        <div class="Content">
            <?php echo $this->addContent(); ?>
        </div>

        <div class="Footer">
            <?php echo $this->addFooter(); ?>
        </div>
        
        <div class="Modals">
            <?php
                $this->addModals();
            ?>
        </div>
    </body>
</html>`

    return result;
}