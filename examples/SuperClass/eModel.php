<?php
require_once(__DIR__.'/../Interface/iModel.php');
require_once(__DIR__.'/eSuper.php');

abstract class eModel extends eSuper implements iModel, JsonSerializable
{
    protected $id;
    protected $idColumn;
    protected $sqlColumns;

    function __construct()
    {
        $this->id = 0;

        $this->idColumn = "id";

        $this->sqlColumns = [];
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getSQLColumns()
    {
        return $this->sqlColumns;
    }

    //OPTIONAL

    function checkExternalFile($url)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_exec($ch);
        $retCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    
        return $retCode;
    }

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

    protected function generateSelectSQLWhere($tableAlias, $columnsAndValues)
    {
        $where = "";

        foreach($columnsAndValues as $columnAndValue)
        {
            $column = $columnAndValue[0];
            $value = $columnAndValue[1];

            $valueType = gettype($value);

            switch($valueType)
            {
                case "boolean":

                    $where .=" AND " . $tableAlias . "." . $column . " = " . ($value) ? "'1'" : "'0'";

                    break;
                case "string":

                    if(!empty($value) && strlen($value) > 0)
                    {
                        $where .=" AND " . $tableAlias . "." . $column . " = '" . $value . "'";
                    }

                    break;
                default:

                    if(!is_null($value))
                    {
                        $where .=" AND " . $tableAlias . "." . $column . " = " . $value;
                    }
            }
        }

        return $where;
    }

    protected function generateInsertSQLColumnsAndValues($columnsAndValues)
    {
        $result = [];
        
        $columns = "";
        $values = "";
        foreach($columnsAndValues as $columnAndValue)
        {
            $column = $columnAndValue[0];
            $value = $columnAndValue[1];

            $valueType = gettype($value);

            switch($valueType)
            {
                case "boolean":

                    $columns .= $column . ", ";
                    $values .= (($value) ? "1" : "0") . ", ";

                    break;
                case "string":

                    if(!empty($value) && strlen($value) > 0)
                    {
                        $columns .= $column . ", ";
                        $values .= "'" . $value . "', ";
                    }

                    break;
                default:
                    if(!is_null($value))
                    {
                        $columns .= $column . ", ";
                        $values .= $value . ", ";
                    }
            }
        }

        if(!empty($columns))
        {
            $columns = substr($columns, 0, -2);
        }
        if(!empty($values))
        {
            $values = substr($values, 0, -2);
        }

        array_push($result, $columns);
        array_push($result, $values);

        return $result;
    }

    protected function generateUpdateSQLColumnsAndValues($columnsAndValues)
    {
        $result = "";
        
        foreach($columnsAndValues as $columnAndValue)
        {
            $column = $columnAndValue[0];
            $value = $columnAndValue[1];

            $valueType = gettype($value);

            switch($valueType)
            {
                case "boolean":

                    $result .= $column . " = " . (($value) ? "1" : "0") . ", ";

                    break;
                case "string":

                    if(!empty($value) && strlen($value) > 0)
                    {
                        $result .= $column . " = '" . $value . "', ";
                    }

                    break;
                default:
                    if(!is_null($value))
                    {
                        $result .= $column . " = " . $value . ", ";
                    }
            }
        }

        if(!empty($result))
        {
            $result = substr($result, 0, -2);
        }

        return $result;
    }
}