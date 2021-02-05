exports.getText = function() {
    let result =
`<?php
namespace App\\Model\\_Interface;

interface iModel
{
    public function setId($id);
    public function getId();
}`

    return result
}