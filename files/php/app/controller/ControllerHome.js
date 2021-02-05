exports.getText = function(title, description, keywords) {
    let result = `<?php

namespace App\\Controller;
    
use Src\\Classes\\Render;
    
class ControllerHome extends Render
{
    public function __construct()
    {
        parent::__construct();

        $this->setTitle("${title}");
        $this->setDescription("${description}");
        $this->setKeywords(array(`

    keywords.forEach((keyword, index) => {
        if (index > 0) {
            result += `,
            `
        }
        result += `"${keyword}"`
    })

    result += `
        ));
        $this->setDirectory("home");

        $this->renderLayout();
    }
}
`

    return result
}