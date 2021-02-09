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

exports.getText = function(pages) {
    let result =
`<?php
namespace Src\\Classes;

use Src\\Traits\\UrlParser;

class Routes
{
    use UrlParser;
    
    private $route;

    public function getRoute()
    {
        $url = $this->parseUrl();
        $I = $url[0];

        $this->route = array(
            "" => "ControllerHome",
            "home" => "ControllerHome",
            "sitemap" => "ControllerSitemap",
`

    pages.forEach((page) => {
        result += `"${page.route}" => "Controller${page.name.capitaliseFirstLetter().replaceAll("-", "_")}",
`        
    })

    result += `
            // JSON
            "api" => "ControllerAPI"
        );

        if(array_key_exists($I, $this->route))
        {
            if(file_exists(DIRREQ . "app/controller/{$this->route[$I]}.php"))
            {
                session_start();
                return $this->route[$I];
            }
            else
            {
                return "ControllerHome";
            }
        }
        else
        {
            return "Controller404";
        }
    }
}`

    return result;
}