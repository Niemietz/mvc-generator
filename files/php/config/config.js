exports.getText = function() {
    let result =
`<?php

$internalFolder = "";

define("USECACHE", false);
define("USEBREADCRUMB", false);
define("USE404BREADCRUMB", false);

define("DIRPAGE", "http://{$_SERVER['HTTP_HOST']}/{$internalFolder}");

if(substr($_SERVER["DOCUMENT_ROOT"], -1) == "/")
{
    define("DIRREQ", "{$_SERVER['DOCUMENT_ROOT']}{$internalFolder}");    
}
else
{
    define("DIRREQ", "{$_SERVER['DOCUMENT_ROOT']}/{$internalFolder}");
}

define("DIRIMG", DIRPAGE . "public/img");
define("DIRFAVICON", DIRPAGE . "public/img/favicon");
define("DIRVIDEO", DIRPAGE . "public/video");
define("DIRAUDIO", DIRPAGE . "public/audio");
define("DIRCSS", DIRPAGE . "public/css");
define("DIRFONTS", DIRPAGE . "public/fonts");
define("DIRJS", DIRPAGE . "public/js");
define("DIRLESS", DIRPAGE . "public/less");`

    return result
}