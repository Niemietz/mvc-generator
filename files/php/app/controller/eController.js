exports.getText = function() {
    let result =
`<?php

namespace App\\Controller;

abstract class eController
{
    protected $result = array();

    public function __construct()
    {
        $this->result = array(
            "result" => null,
            "error" => null
        );
    }
}`

    return result
}