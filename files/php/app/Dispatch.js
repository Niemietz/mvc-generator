exports.getText = function() {
    let result =
`<?php
namespace App;

use Src\\Classes\\Routes;

class Dispatch extends Routes
{
    private $method;
    private $param = array();
    private $obj;

    public function getMethod()
    {
        return $this->method;
    }

    public function setMethod($method)
    {
        $this->method = $method;
    }

    public function getParam()
    {
        return $this->param;
    }

    public function setParam($param)
    {
        $this->param = $param;
    }

    public function __construct()
    {
        self::addController();
    }
    
    private function addController()
    {
        $routeController = $this->getRoute();
        $nameS = "App\\\\Controller\\\\{$routeController}";
        $this->obj = new $nameS();

        $urlParsed = $this->parseUrl();
        if(is_a($this->obj, "App\\Controller\\ControllerAPI") && (!isset($urlParsed[1]) || strlen($urlParsed[1]) <= 0))
        {
            $this->obj->incorrectCall();
        }
        else if(isset($urlParsed[1]) && strlen($urlParsed[1]) > 0)
        {
            self::addMethod();
        }
    }

    private function addMethod()
    {
        $urlParsed = $this->parseUrl();
        if(method_exists($this->obj, $urlParsed[1]))
        {
            $this->setMethod("{$urlParsed[1]}");
            self::addParam();
            call_user_func_array(array($this->obj, $this->getMethod()), $this->getParam());
        }
        else if(is_a($this->obj, "App\\Controller\\ControllerAPI"))
        {
            $this->obj->incorrectCall();
        }
    }
    
    private function addParam()
    {
        $urlParsed = $this->parseUrl();
        $contArray = count($urlParsed);

        if($contArray > 2)
        {
            foreach($this->parseUrl() as $key => $value)
            {
                if($key > 1)
                {
                    $this->setParam($this->param += array($key => $value));
                }
            }
        }
    }
}`

    return result
}