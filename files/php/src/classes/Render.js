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

exports.getText = function(pages) {
    let result =
`<?php
namespace Src\\Classes;

use Src\\Interfaces\\iView;

class Render implements iView
{
    private $directory;
    private $title;
    private $description;
    private $keywords;
    
    public function __construct()
    {
        $this->keywords = array(
            ""
        );
    }
    
    public function getDirectory()
    {
        return $this->directory;
    }
    
    public function setDirectory($directory)
    {
        $this->directory = $directory;
    }
    
    public function getTitle()
    {
        return $this->title;
    }
    
    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getDescription()
    {
        return $this->description;
    }
    
    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getKeywords()
    {
        $keywordsString = "";
        $i = 0;
        foreach($this->keywords as $keyword)
        {
            if($i > 0)
            {
                $keywordsString .= ", ";                
            }
            $keywordsString .= $keyword;
            $i++;
        }

        return $keywordsString;
    }

    public function setKeywords($keywords)
    {
        $newKeywords = array_merge($this->keywords, $keywords);

        $this->keywords = $newKeywords;
    }

    public function renderLayout()
    {
        include_once(DIRREQ . "app/view/main.php");
    }
    
    public function addHead()
    {
        if(file_exists(DIRREQ . "app/view/{$this->getDirectory()}/head.php"))
        {
            include(DIRREQ . "app/view/{$this->getDirectory()}/head.php");
        }
    }
    
    public function addTopbar()
    {
        if(file_exists(DIRREQ . "app/view/topbar.php"))
        {
            include(DIRREQ . "app/view/topbar.php");
        }
    }

    public function addHeader()
    {
        if(file_exists(DIRREQ . "app/view/{$this->getDirectory()}/header.php"))
        {
            include(DIRREQ . "app/view/{$this->getDirectory()}/header.php");
        }
    }
    
    public function addContent()
    {
        if(file_exists(DIRREQ . "app/view/{$this->getDirectory()}/content.php"))
        {
            include(DIRREQ . "app/view/{$this->getDirectory()}/content.php");
        }        
    }

    public function addFooter()
    {
        if(file_exists(DIRREQ . "app/view/{$this->getDirectory()}/footer.php"))
        {
            include(DIRREQ . "app/view/{$this->getDirectory()}/footer.php");
        }
    }
`
    const insertEditListTypeIds = [5, 6, 8, 9, 10, 11]
    if (pages.find(obj => insertEditListTypeIds.includes(obj.type.id)) != null) {
        result += `
    public function addModals()
    {
        `
        pages.forEach((page) => {
            if (page.type.id == 5
            || page.type.id == 10) {
                result += `$this->add${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal();
        `
            } else if(page.type.id == 6
            || page.type.id == 9) {
                result += `$this->edit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal();
        `
            } else if(page.type.id == 8
            || page.type.id == 11) {
                result += `$this->addEdit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal();
        `
            }
        })

        result +=
`   }
`
    }

    pages.forEach((page) => {
        if (page.type.id == 5
        || page.type.id == 10) {
            result += `
    private function add${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/${page.name}/modals/add_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/${page.name}/modals/add_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        } else if(page.type.id == 6
        || page.type.id == 9) {
            result += `
    private function edit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/${page.name}/modals/edit_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/${page.name}/modals/edit_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        } else if(page.type.id == 8
        || page.type.id == 11) {
            result += `
    private function addEdit${page.item.name.replaceAll("-", "_").capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/${page.name}/modals/addEdit_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/${page.name}/modals/addEdit_${page.item.name.replaceAll("-", "_").replaceAt(0, page.item.name.replaceAll("-", "_").charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        }
    })

    result += `}`

    return result
}