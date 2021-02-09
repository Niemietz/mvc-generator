/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

exports.getText = function(page) {
    let result = `<?php

namespace App\\Controller;
    
use Src\\Classes\\Render;
    
class Controller${page.name.replaceAll("-", "_")} extends Render
{
    public function __construct()
    {
        parent::__construct();

        $this->setTitle("${page.title}");
        $this->setDescription("${page.description}");
        $this->setKeywords(array(`
    page.keywords.forEach((keyword, index) => {
        if (index > 0) {
            result += `,
            `
        }
        result += `"${keyword}"`
    })

    result += `
        ));
        $this->setDirectory("${page.name}");

        $this->renderLayout();
    }
}
`

    return result
}