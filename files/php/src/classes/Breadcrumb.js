exports.getText = function() {
    let result =
`<?php
namespace Src\\Classes;

use Src\\Traits\\UrlParser;

class Breadcrumb
{
    use UrlParser;

    public function addBreadcrumb()
    {
        echo "<a href=" . DIRPAGE . ">Home</a>";

        $counter = count($this->parseUrl());
        
        $arrLink[0] = "";
        for($i = 0; $i < $counter; $i++)
        {
            $arrLink[0] .= $this->parseUrl()[$i]. "/";

            if(strlen($this->parseUrl()[$i]) > 0 && strtolower($this->parseUrl()[$i]) != strtolower("home"))
            {
                echo " > <a href=" . DIRPAGE . $arrLink[0] . ">" . $this->parseUrl()[$i] . "</a>";
            }
        }
    }
    
    public function add404Breadcrumb()
    {
        echo "<a href=" . DIRPAGE . ">Home</a>";
    }
}`

    return result
}