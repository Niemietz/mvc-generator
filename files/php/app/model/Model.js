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

use App\\Model\\SuperClass\\eModel;

use App\\Data\\DAO;

class ${model.name.replaceAll("-", "_")} extends eModel
{
    `
    model.attributesAndColumnNames.forEach((item) => {
        result += `private $${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())};
    `
    })
    result += `
    function __construct()
    {
        parent::__construct();`
    model.attributesAndColumnNames.forEach((item) => {
    result += 
`
        $this->${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())} = `
        if (item.type.id == 1) {
            result += `-1;`;
        } else if (item.type.id == 2) {
            result += `"";`;
        } else if (item.type.id == 3) {
            result += `false;`;
        } else if (item.type.id == 4) {
            result += `-1;`;
        } else if (item.type.id == 5) {
            result += `-1.0;`;
        } else if (item.type.id == 6) {
            result += `'';`;
        }
    })
    result += `
    }
`
    if (model.select) {
        result += `
    public function read()
    {
        $result = false;

        $query = "SELECT ";
        `
        model.attributesAndColumnNames.forEach((item, index) => {
            if (index > 0) {
                result += `, ";
        $query .= "`
            } else {
                result += `$query .= "`
            }
            result += `${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.${item.columnName}`
        })
        result += `";
        $query .= " FROM ${model.columnName} ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}";
        $query .= " WHERE ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.id = " . $this->getId();

        $dao = new DAO();
        $sql = $dao->executeQuery($query);

        if(mysqli_num_rows($sql) > 0)
        {
            if($row = $sql->fetch_assoc())
            {
                $this->setId($row['id']);`
        model.attributesAndColumnNames.forEach((item, index) => {
            if (item.type.id == 3) {
                result += `
                $this->set${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}(($row['${item.columnName}'] == "1") ? true : false);`
            } else {
                result += `
                $this->set${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}($row['${item.columnName}']);`
            }
        })
        result += `
            }

            $result = true;
        }

        return $result;
    }
`
    }

    if (model.insert) {
        result += `
    public function insert()
    {
        $result = 0;

        $query = "SELECT ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.id";
        $query .= " FROM ${model.columnName} ${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}";`
        model.attributesAndColumnNames.forEach((item, index) => {
            if (index == 0) {
                result += `
        $query .= " WHERE `
            } else {
                result += `
        $query .= " AND `
            }
            if (item.type.id == 2 || item.type.id == 6) {
                result += `UPPER(${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.${item.columnName}) = UPPER('" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "')";`
            } else {
                result += `${model.name.replaceAll("-", "_").charAt(0).toLowerCase()}.${item.columnName} = " . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}();`
            }
        })

        result += `
        
        $dao = new DAO();
        $sql = $dao->executeQuery($query);

        if(mysqli_num_rows($sql) == 0)
        {
            $query = "INSERT INTO ${model.columnName}(";`
        model.attributesAndColumnNames.forEach((item, index) => {
            if (index > 0) {
                result += `, ";
            $query .= "`
            } else {
                result += `
            $query .= "`
            }
            result += `${item.columnName}`
        })
        result +=   `";
            $query .= ")";
            $query .= " VALUES (";
            `
        model.attributesAndColumnNames.forEach((item, index) => {
            // MIDDLE ITEMS IN ARRAY
            if (index > 0 && index < model.attributesAndColumnNames.length - 1) {
                if (item.type.id == 2 || item.type.id == 6) {
                    result += `"'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "', ";
            $query .= `
                } else {
                    result += `$this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . ", ";
            $query .= `
                }
            } else if (index == 0 && model.attributesAndColumnNames.length > 1) {   // FIRST OF MANY ITEMS IN ARRAY
                if (item.type.id == 2 || item.type.id == 6) {
                    result += `$query .= "'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "', ";
            $query .= `
                } else {
                    result += `$query .= $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . ", ";
            $query .= `
                }
            } else { // LAST ITEM OF ARRAY
                if (item.type.id == 2 || item.type.id == 6) {
                    result += `${(index == 0) ? "$query .= " : "" }"'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "'";`
                } else {
                    result += `${(index == 0) ? "$query .= " : "" }$this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}();`
                }
            }
        })
        result += `
            $query .= ")";

            $${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id = $dao->executeQueryAndGetId($query);

            if($${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id > 0)
            {
                $this->setId($${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id);
                $result = $${model.name.replaceAll("-", "_").replaceAt(0, model.name.replaceAll("-", "_").charAt(0).toLowerCase())}Id;
            }
        }
        else
        {
            if($row = $sql->fetch_assoc())
            {
                $this->setId((int)$row["id"]);
                $result = (int)$row["id"];
            }
        }

        return $result;
    }
`
    }

    if (model.update) {
        result += `
    public function update()
    {
        $result = false;

        if($this->getId() > 0)
        {
            $query = "UPDATE ${model.columnName} SET ";
            `
            model.attributesAndColumnNames.forEach((item, index) => {
                // MIDDLE ITEMS IN ARRAY
                if (index > 0 && index < model.attributesAndColumnNames.length - 1) {
                    result += `${item.columnName} = `
                    if (item.type.id == 2 || item.type.id == 6) {
                        result += `'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "', ";
            $query .= "`
                    } else {
                        result += `" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . ", ";
            $query .= "`
                    }
                } else if (index == 0 && model.attributesAndColumnNames.length > 1) { // FIRST OF MANY ITEMS IN ARRAY
                    result += `$query .= "${item.columnName} = `
                    if (item.type.id == 2 || item.type.id == 6) {
                        result += `'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "', ";
            $query .= "`
                    } else {
                        result += `" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . ", ";
            $query .= "`
                    }
                } else { // LAST ITEM OF ARRAY
                    result += `${((index == 0) ? "$query .= \"" : "") + item.columnName} = `
                    if (item.type.id == 2 || item.type.id == 6) {
                        result += `'" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}() . "'";`
                    } else {
                        result += `" . $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}();`
                    }
                }
            })
            result += `
            $query .= " WHERE id = " . $this->getId();

            $dao = new DAO();
            if($dao->executeQueryAndGetNumberOfAffectedRows($query) > 0)
            {
                $result = true;
            }
        }

        return $result;
    }
`
    }

    if (model.delete) {
        result += `
    public function delete()
    {
        $result = false;

        if($this->getId() > 0)
        {
            $query = "DELETE FROM ${model.columnName}";
            $query .= " WHERE id = " . $this->getId();

            try
            {
                $dao = new DAO();
                if($dao->executeQueryAndGetNumberOfAffectedRows($query))
                {
                    $result = true;
                }
            }
            catch(\Exception $error)
            {
                throw $error;
            }
        }
        else
        {
            throw new \\Exception("Could not delete ${model.name.replaceAll("-", "_")} from database: Missing ID.");
        }

        return $result;
    }
`
    }
    
    model.attributesAndColumnNames.forEach((item, index) => {
        result += `
    public function get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}()
    {
        return $this->${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())};
    }

    public function set${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}($${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())})
    {
        $this->${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())} = $${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())};
    }
`
    })

    result += `
    public function jsonSerialize()
    {
        return array(
            'id' => $this->getId()`
    model.attributesAndColumnNames.forEach((item, index) => {
        result += `,
            '${item.attribute.replaceAll("-", "_").replaceAt(0, item.attribute.replaceAll("-", "_").charAt(0).toLowerCase())}' => $this->get${item.attribute.replaceAll("-", "_").capitaliseFirstLetter()}()`
    })
    
    result += `
        );
    }
`

    result += `}`

    return result
}