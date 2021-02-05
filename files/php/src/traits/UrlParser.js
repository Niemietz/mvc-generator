exports.getText = function() {
    let result =
`<?php
namespace Src\\Traits;

trait UrlParser
{
    public function parseUrl()
    {
        return explode("/", rtrim($_GET["url"]), FILTER_SANITIZE_URL);
    }
}`

    return result
}