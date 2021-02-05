String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

exports.getText = function(models) {
    let result = 
`<?php
namespace App\\Controller;

`
    if (models != null) {
        models.forEach((model) => {
            result += 
`use App\\Model\\${model.name};
`
            if (model.hasList) {
                result +=
`use App\\Model\\${model.name}s;
`
            }
        })
    }
    result +=
`use App\\Data\\DAO;
use PHPMailer\\PHPMailer\\PHPMailer;
use PHPMailer\\PHPMailer\\Exception;

require DIRREQ . '/src/vendor/autoload.php';

class ControllerAPI extends eController
{
    public function __construct()
    {
        parent::__construct();

        header('Content-Type: application/json');
    }`
    if (models != null) {
        models.forEach((model) => {
            if(model.hasList) {
                result += `

    public function ${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}s()
    {
        try
        {
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}s = new ${model.name}s();
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}s->read();
    
            $this->result["result"] = $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}s->getList();
            $this->result["error"] = null;
        }
        catch(\\Exception $ex)
        {
            $this->result["result"] = null;
            $this->result["error"] = $ex->getMessage();
        }
    
        print_r(json_encode($this->result));
    }
    
    `
            }
            
            if(model.select) {
                result += `public function ${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id)
    {
        try
        {
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())} = new ${model.name}();
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->setId($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id);
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->read();
    
            $this->result["result"] = $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())};
            $this->result["error"] = null;
        }
        catch(\\Exception $ex)
        {
            $this->result["result"] = null;
            $this->result["error"] = $ex->getMessage();
        }
    
        print_r(json_encode($this->result));
    }
    
    `
            }
            
            if(model.insert) {
                result += `public function add_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}()
    {
        $dao = null;
        try
        {
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())} = new ${model.name}();
            `
            model.attributesAndColumnNames.forEach((item) => {
                result += `if(!is_null($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]) && isset($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]))
            {
                $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->set${item.attribute.capitaliseFirstLetter()}($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]);
            }
            `
            })
            result += 
            `$dao = new DAO();
            $dao->startTransaction();
    
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id =$${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->insert();

            if($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id > 0)
            {
                $dao->commitTransaction();

                $this->result["result"] = $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id;
                $this->result["error"] = null;
            }
            else
            {
                if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }
            }
        }
        catch(\\Exception $ex)
        {
            if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }

            $this->result["result"] = null;
            $this->result["error"] = $ex->getMessage();
        }

        print_r(json_encode($this->result));
    }

    `
            }
            
            if(model.update) {
                result += `public function edit_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id)
    {
        $dao = null;
        try
        {
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())} = new ${model.name}();
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->read($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id);
    
            `
            model.attributesAndColumnNames.forEach((item) => {
                result += `if(!is_null($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]) && isset($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]))
            {
                $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->set${item.attribute.capitaliseFirstLetter()}($_POST["${item.attribute.replaceAt(0, item.attribute.charAt(0).toLowerCase())}"]);
            }
            `
            })
            result += `
            $dao = new DAO();
            $dao->startTransaction();
    
            if($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->update() == true)
            {
                $dao->commitTransaction();
    
                $this->result["result"] = true;
                $this->result["error"] = null;
            }
            else
            {
                if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }
            }
        }
        catch(\\Exception $ex)
        {
            if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }
    
            $this->result["result"] = null;
            $this->result["error"] = $ex->getMessage();
        }
    
        print_r(json_encode($this->result));
    }
    
    `
            }

            if(model.delete) {
                result += `public function delete_${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id)
    {
        $dao = null;
        try
        {
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())} = new ${model.name}();
            $${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->read($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}Id);
    
            $dao = new DAO();
            $dao->startTransaction();
    
            if($${model.name.replaceAt(0, model.name.charAt(0).toLowerCase())}->delete() == true)
            {
                $dao->commitTransaction();
    
                $this->result["result"] = true;
                $this->result["error"] = null;
            }
            else
            {
                if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }

                $this->result["result"] = false;
                $this->result["error"] = "Could not delete ${model.name}!";
            }
        }
        catch(\\Exception $ex)
        {
            if (!is_null($dao))
            {
                $dao->rollbackTransaction();
            }
    
            $this->result["result"] = null;
            $this->result["error"] = $ex->getMessage();
        }
    
        print_r(json_encode($this->result));
    }`
            }
        })
    }
    result +=
`
}`

    return result
}