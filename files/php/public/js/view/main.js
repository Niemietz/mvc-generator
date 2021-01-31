export default function(author, framework, hasList) {
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
    if (framework.id == 1) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap5.min.css">`
            }
            result += 
`       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-multiselect.css' ?>">
`
        } else {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/dataTables.bootstrap4.min.css" ?>">
       <link rel="stylesheet" href="<?= DIRCSS . "/dataTables.bootstrap4.min.css" ?>">`
            }
            result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/all.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . "/bootstrap.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-multiselect.css' ?>">
`
        }
    } else if (framework.id == 2) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-components-web/4.0.0/material-components-web.min.css">
       <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/dataTables.material.min.css">`
            }
            result += 
`       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.2.0/mdb.min.css">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-multiselect.css' ?>">
`
        } else {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/material-components-web.min.css" ?>">
       <link rel="stylesheet" href="<?= DIRCSS . "/dataTables.material.min.css" ?>">`
            }
            result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/all.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . "/google-fonte.css" ?>" />
        <link rel="stylesheet" href="<?= DIRCSS . '/mdb.min.css' ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/bootstrap-multiselect.css' ?>">
`
        }
    } else if (framework.id == 3) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-components-web/4.0.0/material-components-web.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/dataTables.material.min.css">`
            }
            result += 
`       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
`
        } else {
            if (hasList) {
                result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/material-components-web.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . "/dataTables.material.min.css" ?>">`
            }
            result += 
`       <link rel="stylesheet" href="<?= DIRCSS . '/materialize.min.css' ?>">
`
        }
    }

    if (framework.useCDN) {
        result += 
`       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10">
        <link rel="stylesheet" href="<?= DIRCSS . '/notiflix-2.7.0.min.css' ?>">

        <link rel="stylesheet" href="<?= DIRCSS . '/custom.css' ?>">

        <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
`
    } else {
        result += 
`       <link rel="stylesheet" href="<?= DIRCSS . "/sweetalert2.min.css" ?>">
        <link rel="stylesheet" href="<?= DIRCSS . '/notiflix-2.7.0.min.css' ?>">

        <link rel="stylesheet" href="<?= DIRCSS . '/custom.css' ?>">

        <script type="text/javascript" src="<?= DIRJS . "/jquery-3.5.1.min.js" ?>"></script>
`
    }

    if (framework.id == 1) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap5.min.js"></script>`
            }
            result += 
`       <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-multiselect.js" ?>"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/xcash/bootstrap-autocomplete@v2.3.7/dist/latest/bootstrap-autocomplete.min.js"></script>
`
        } else {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="<?= DIRJS . "/jquery.dataTables.min.js" ?>"></script>
       <script type="text/javascript" src="<?= DIRJS . "/dataTables.bootstrap5.min.js" ?>"></script>`
            }
            result += 
`       <script type="text/javascript" src="<?= DIRJS . "/bootstrap.bundle.min.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-multiselect.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-autocomplete.js" ?>"></script>
`
        }
    } else if (framework.id == 2) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/dataTables.material.min.js"></script>`
            }
            result += 
`       <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.2.0/mdb.min.js"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-multiselect.js" ?>"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/xcash/bootstrap-autocomplete@v2.3.7/dist/latest/bootstrap-autocomplete.min.js"></script>
`
        } else {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="<?= DIRJS . "/jquery.dataTables.min.js" ?> "></script>
       <script type="text/javascript" src="<?= DIRJS . "/dataTables.material.min.js" ?> "></script>`
            }
            result += 
`       <script type="text/javascript" src="<?= DIRJS . "/mdb.min.js" ?> "></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-multiselect.js" ?>"></script>
        <script type="text/javascript" src="<?= DIRJS . "/bootstrap-autocomplete.js" ?>"></script>
`
        }
    } else if (framework.id == 3) {
        if (framework.useCDN) {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
       <script type="text/javascript" src="https://cdn.datatables.net/1.10.23/js/dataTables.material.min.js"></script>`
            }
            result += 
`       <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
`
        } else {
            if (hasList) {
                result += 
`       <script type="text/javascript" src="<?= DIRJS . "/jquery.dataTables.min.js" ?> "></script>
       <script type="text/javascript" src="<?= DIRJS . "/dataTables.material.min.js" ?> "></script>`
            }
            result += 
`       <script type="text/javascript" src="<?= DIRJS . "/materialize.min.js" ?> "></script>
`
        }
    }
    if (framework.useCDN) {
        result += 
`       <script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`
    } else {
        result += 
`       <script type="text/javascript" src="<?= DIRJS . "/sweetalert.min.js" ?> "></script>`
    }

    result += `
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