exports.getText = function() {
    let result =
`<?php
namespace Src\\Traits;

class UrlParserPHP5_3
{
    public function parseUrl()
    {
        return explode("/", rtrim($_GET["url"]), FILTER_SANITIZE_URL);
    }
}`

    return result
}