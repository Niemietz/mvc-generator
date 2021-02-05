exports.getText = function(keywords404) {
    let result = `<?php

namespace App\\Controller;
    
use Src\\Classes\\Render;
    
class Controller404 extends Render
{
    public function __construct()
    {
        parent::__construct();

        $this->setTitle("Erro 404 - Pág. não encontrada");
        $this->setDescription("Não foi possível encontrar a página solicitada.");
        $this->setKeywords(array(`

    keywords404.forEach((keyword, index) => {
        if (index > 0) {
            result += `,
            `
        }
        result += `"${keyword}"`
    })

    result += `
        ));
        $this->setDirectory("404");

        $this->renderLayout();
    }
}
`

    return result
}