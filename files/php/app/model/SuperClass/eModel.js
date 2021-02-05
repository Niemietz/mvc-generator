exports.getText = function() {
    let result =
`<?php
namespace App\\Model\\SuperClass;

use App\\Model\\_Interface\\iModel;

abstract class eModel extends eSuper implements iModel, \\JsonSerializable
{
    protected $id;

    function __construct()
    {
        $this->id = 0;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    //OPTIONAL

    // MUST OVERRIDE

    public function read()
    {
        return false;
    }

    /*public function insertOrUpdate()
    {
        return -1;
    }

    protected function insert()
    {
        return 0;
    }

    protected function update()
    {
        return false;
    }*/

    protected function delete()
    {
        return false;
    }

    protected function carregarPropriedades()
    {
        // nothing
    }
}`

    return result
}