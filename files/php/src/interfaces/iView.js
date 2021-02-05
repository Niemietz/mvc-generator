exports.getText = function() {
    let result =
`<?php
namespace Src\\Interfaces;

interface iView
{    
    public function setDirectory($directory);
    public function setTitle($title);
    public function setDescription($description);
    public function setKeywords($keywords);

    public function renderLayout();
}`

    return result
}