<?php
require_once(__DIR__.'/eSuper.php');

abstract class eModelList extends eSuper implements JsonSerializable
{
    private $list = array();

    public function add($obj)
    {
        array_push($this->list, $obj);
    }

    public function remove($key)
    {
        if(array_key_exists($key, $this->list))
        {
            unset($this->list[$key]);
        }
    }

    public function size()
    {
        return count($this->list);
    }

    public function isEmpty()
    {
        return empty($this->list);
    }

    public function getList()
    {
        return $this->list;
    }

    public function getObj($key)
    {
        if(array_key_exists($key, $this->list))
        {
            return $this->list[$key];
        }
        else
        {
            return NULL;
        }
    }

    public function getKey($obj)
    {
        $arrKeys = array_keys($this->list, $obj);

        if(empty($arrKeys))
        {
            return -1;
        }
        else
        {
            return $arrKeys[0];
        }
    }

    public function jsonSerialize()
    {
        return $this->getList();
    }
}