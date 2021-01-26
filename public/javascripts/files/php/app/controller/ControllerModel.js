export default function(model) {
`<?php

namespace App\\Controller;
    
use Src\\Classes\\Render;
    
class Controller${model.name} extends Render
{
    public function __construct()
    {
        parent::__construct();

        $this->setTitle("${model.name}");
        $this->setDescription("${model.description}");
        $this->setKeywords(array(`
    model.keywords.forEach((keyword, index) => {
        if (index > 0) {
            result += `,
            `
        }
        result += `"${keyword}"`
    })

    result += `
        ));
        $this->setDirectory("${model.name}");

        $this->renderLayout();
    }
}
`
}