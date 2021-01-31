export default function(pages) {
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
                result += `$this->add${page.item.name.capitaliseFirstLetter()}Modal();
`
            } else if(page.type.id == 6
            || page.type.id == 9) {
                result += `$this->edit${page.item.name.capitaliseFirstLetter()}Modal();
`
            } else if(page.type.id == 8
            || page.type.id == 11) {
                result += `$this->addEdit${page.item.name.capitaliseFirstLetter()}Modal();
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
    private function add${page.item.name.capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/add_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/add_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        } else if(page.type.id == 6
        || page.type.id == 9) {
            result += `
    private function edit${page.item.name.capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/edit_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/edit_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        } else if(page.type.id == 8
        || page.type.id == 11) {
            result += `
    private function addEdit${page.item.name.capitaliseFirstLetter()}Modal()
    {
        if(file_exists(DIRREQ . "app/view/addEdit_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php"))
        {
            include(DIRREQ . "app/view/addEdit_${page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase())}_modal.php");
        }
    `
            result += `}
`
        }
    })

    result += `}`

    return result
}