export default function(model) {
    let result = ""

    result =
`<?php
namespace App\\Model;

use App\\Model\\SuperClass\eModelList;
use App\\Model\\${model.name};
use App\\Data\\DAO;

class ${model.name}s extends eModelList
{
    public function read()
    {
        $result = false;

        $query = "SELECT ${model.name.charAt(0).toLowerCase()}.id, ";`
    model.attributesAndColumnNames.forEach((item, index) => {
        if (index > 0) {
            result += `, ";
        $query .= "`
        } else {
            result += `
        $query .= "`
        }
        result += `${model.name.charAt(0).toLowerCase()}.${item.columnName}`
    })

    result += `";
        $query .= " FROM ${model.columnName} ${model.name.charAt(0).toLowerCase()}";

        try
        {
            $sql = DAO::executeQuery($query);

            if(mysqli_num_rows($sql) > 0)
            {
                while($row = $sql->fetch_array())
                {
                    $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())} = new ${model.name}();
                    $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->setId($row['id']);`
    model.attributesAndColumnNames.forEach((item, index) => {
        result += `
                    $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->set${item.attribute.capitaliseFirstLetter()}($row['${item.columnName}']);`
    })
    result += `

                    $this->add($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())});
                }

                $result = true;
            }
        }
        catch(\\Exception $error)
        {
            throw new \\Exception($error->getMessage());
        }

        return $result;
    }
}`

    return result
}