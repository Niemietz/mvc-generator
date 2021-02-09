String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

exports.getText = function(model) {
    let result = ""

    result =
`<?php
namespace App\\Model;

use App\\Model\\SuperClass\\eModelList;
use App\\Model\\${model.name.replaceAll("-", "_")};
use App\\Data\\DAO;

class ${model.name.replaceAll("-", "_")}s extends eModelList
{
    public function read()
    {
        $result = false;

        $query = "SELECT ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.id, ";`
    model.attributesAndColumnNames.forEach((item, index) => {
        if (index > 0) {
            result += `, ";
        $query .= "`
        } else {
            result += `
        $query .= "`
        }
        result += `${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.${item.columnName}`
    })

    result += `";
        $query .= " FROM ${model.columnName} ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}";

        try
        {
            $dao = new DAO();
            $sql = $dao->executeQuery($query);

            if(mysqli_num_rows($sql) > 0)
            {
                while($row = $sql->fetch_array())
                {
                    $${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())} = new ${model.name.replaceAll("-", "_")}();
                    $${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}->setId($row['id']);`
    model.attributesAndColumnNames.forEach((item, index) => {
        result += `
                    $${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}->set${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}($row['${item.columnName}']);`
    })
    result += `

                    $this->add($${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())});
                }

                $result = true;
            }
        }
        catch(\\Exception $error)
        {
            throw $error;
        }

        return $result;
    }
}`

    return result
}