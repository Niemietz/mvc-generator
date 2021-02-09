import { getLanguage } from '/javascripts/views/language-chooser.js';
import { setOnLanguageChooseFromIndex } from '/javascripts/views/language-chooser.js';
import { setAfterDatabaseFormValidation, getDatabase, getDatabaseForm } from '/javascripts/tabs/database.js';
import getFramework from '/javascripts/tabs/framework.js';
import getLibsVersions from '/javascripts/tabs/libs.js';
import getModels from '/javascripts/tabs/model-adder.js';
import { getPages } from '/javascripts/tabs/page-adder.js';

const inpDebugId = "debug";

const myFilesDownloadClass = "my-files-download"
const myFilesDeleteClass = "my-files-delete"
const phpFilesContainerId = "php-files-container"
const javaFilesContainerId = "java-files-container"
const kotlinFilesContainerId = "kotlin-files-container"
const phpFilesId = "php-files"
const javaFilesId = "java-files"
const kotlinFilesId = "kotlin-files"
const btnNavLinkClass = "nav-link";
const divNavLinkPagesId = "nav-pages";
const divTabPagesId = "pages";
const aDatabaseId = "database-tab";
const divNavLinkFrameworksId = "nav-frameworks";
const divTabFrameworksId = "frameworks";
const divNavLinkLibsId = "nav-libs";
const divTabLibsId = "libs";
const divContentClass = "content";
const divLoadingClass = "loading";
const txtLoadingClass = "loading-text";
const divWebsiteGeneralComponentsId = "website-general-components-container";
const frmWebsiteFormId = "website-form";
const inpWebsiteTitleLabelId = "website-title-label";
const inpWebsiteTitleId = "website-title";
const inpWebsiteKeywordsContainerId = "website-keywords-container";
const inpWebsiteKeywordsId = "website-keywords";
const inp404KeywordsId = "404-keywords";
const inpWebsiteTitleName = "website-title";
const inpWebsiteAuthorName = "website-author";
const inpWebsiteEmailName = "website-email";
const inpWebsiteDescriptionName = "website-description";
const inpWebsiteKeywordsName = "website-keywords";
const inpLoadingTextName = "loading-text";
const inpLoadingClassName = "loading-class";
const inpLoadingTextClassName = "loading-text-class";
const inpLoadingModalClassName = "loading-modal-class";
const inpContentClassName = "content-class";
const inpContentModalClassName = "content-modal-class";
const inp404KeywordsName = "404-keywords";
const div404KeywordsId = "404-keywords-container";
const btnGenerateFilesId = "generate-files";

export function showMessage(message, type = null, log = true)
{
    switch(type)
    {
        case 1:
            Notiflix.Notify.Success(message)

            if(log)
            {
                console.log(message);
            }

            break;
        case 2:
            Notiflix.Notify.Warning(message)

            if(log)
            {
                console.warn(message);
            }

            break;
        case 3:
            Notiflix.Notify.Failure(message)

            if(log)
            {
                console.error(message);
            }

            break;
        default:
            Notiflix.Notify.Info(message)
            if(log)
            {
                console.log(message);
            }
    }
}

function setPageStatus(status, loadingText = "Carregando...")
{
    $("." + txtLoadingClass).html(loadingText);

    switch(status)
    {
        case 1:

            $("." + divLoadingClass).removeClass("d-none");
            $("." + divContentClass).addClass("d-none");
            $("." + btnNavLinkClass).addClass("disabled");
            $("#" + btnGenerateFilesId).addClass("disabled");

            break;
        case 2:

            $("." + divLoadingClass).addClass("d-none");
            $("." + divContentClass).removeClass("d-none");
            $("." + btnNavLinkClass).removeClass("disabled");
            $("#" + btnGenerateFilesId).removeClass("disabled");

            break;
    }
}

let afterGeneralFormValidation = null;

const generatorData = {
    "title": "",
    "author": "",
    "email": "",
    "description": "",
    "keywords404": [],
    "keywords": [],
    "loadingText": "Loading...",
    "loadingTextClass": "loading-text",
    "loadingClass": "loading",
    "loadingModalClass": "loading-modal",
    "contentClass": "content",
    "contentModalClass": "content-modal",
    "database": null,
    "language": null,
    "framework": null,
    "models": [],
    "libsVersions": [],
    "pages": []
}

function getGeneratorData() {
    const formData = $(`#${frmWebsiteFormId}`).serializeFormJSON()

    generatorData.title = formData[inpWebsiteTitleName]
    generatorData.author = formData[inpWebsiteAuthorName]
    generatorData.email = formData[inpWebsiteEmailName]
    generatorData.database = getDatabase()
    generatorData.language = getLanguage()
    generatorData.models = getModels()
    if (generatorData.language.value == 1) {
        generatorData.description = formData[inpWebsiteDescriptionName]
        generatorData.keywords404 = formData[inp404KeywordsName].splitAndTrim()
        generatorData.keywords = formData[inpWebsiteKeywordsName].splitAndTrim()
    
        generatorData.loadingText = formData[inpLoadingTextName]
        generatorData.loadingClass = formData[inpLoadingClassName]
        generatorData.loadingTextClass = formData[inpLoadingTextClassName]
        generatorData.loadingModalClass = formData[inpLoadingModalClassName]
        generatorData.contentClass = formData[inpContentClassName]
        generatorData.contentModalClass = formData[inpContentModalClassName]
    
        generatorData.pages = getPages()
        generatorData.framework = getFramework()
    } else {
        delete generatorData.keywords404
        delete generatorData.keywords

        delete generatorData.loadingText
        delete generatorData.loadingClass
        delete generatorData.loadingTextClass
        delete generatorData.loadingModalClass
        delete generatorData.contentClass
        delete generatorData.contentModalClass

        delete generatorData.pages
        delete generatorData.framework
    }
    if (generatorData.language.value == 3) {
        generatorData.libsVersions = getLibsVersions()
    } else {
        delete generatorData.libsVersions
    }

    return generatorData
}

function loadPHPFiles(phpFiles) {
    const phpFileSelect = document.getElementById(phpFilesId)
    phpFileSelect.querySelectorAll("option").forEach((childNode) => { childNode.remove(); })
    if (phpFiles.length == 0) {
        const phpFileOption = document.createElement("option");
        phpFileOption.value = "";
        phpFileOption.innerHTML = "-"

        phpFileSelect.append(phpFileOption)
    }

    phpFiles.forEach((phpFile, index) => {
        const phpFileOption = document.createElement("option");
        phpFileOption.value = phpFile;
        phpFileOption.innerHTML = new Date(phpFile).toLocaleString()

        if (index == 0) {
            phpFileOption.selected = true
        }

        phpFileSelect.append(phpFileOption)
    })
}

function loadJavaFiles(javaFiles) {
    const javaFileSelect = document.getElementById(javaFilesId)
    if (javaFiles.length == 0) {
        const javaFileOption = document.createElement("option");
        javaFileOption.value = "";
        javaFileOption.innerHTML = "-"

        javaFileSelect.append(javaFileOption)
    }

    javaFiles.forEach((javaFile, index) => {
        const javaFileOption = document.createElement("option");
        javaFileOption.value = javaFile;
        javaFileOption.innerHTML = new Date(javaFile).toLocaleString()

        if (index == 0) {
            javaFileOption.selected = true
        }

        javaFileSelect.append(javaFileOption)
    })
}

function loadKotlinFiles(kotlinFiles) {
    const kotlinFileSelect = document.getElementById(kotlinFilesId)
    if (kotlinFiles.length > 0) {
        const kotlinFileOption = document.createElement("option");
        kotlinFileOption.value = "";
        kotlinFileOption.innerHTML = "-"

        kotlinFileSelect.append(kotlinFileOption)
    }

    kotlinFiles.forEach((kotlinFile, index) => {
        const kotlinFileOption = document.createElement("option");
        kotlinFileOption.value = kotlinFile;
        kotlinFileOption.innerHTML = new Date(kotlinFile).toLocaleString()

        if (index == 0) {
            kotlinFileOption.selected = true
        }

        kotlinFileSelect.append(kotlinFileOption)
    })
}

function getMyFiles(language = -1) {
    const phpURL = "\\show\\php"
    const javaURL = "\\show\\java"
    const kotlinURL = "\\show\\kotlin"

    const runPHPJsonAjax = function() {
        jsonAjax({
            "url": phpURL,
            "type": "GET",
            success: function(response) {
                loadPHPFiles(response.content.files)
            },
            error: function(er) {
                console.error(er)
            }
        })
    }
    
    const runJavaJsonAjax = function() {
        jsonAjax({
            "url": javaURL,
            "type": "GET",
            success: function(response) {
                loadJavaFiles(response.content.files)
            },
            error: function(er) {
                console.error(er)
            }
        })
    }
    
    const runKotlinJsonAjax = function() {
        jsonAjax({
            "url": kotlinURL,
            "type": "GET",
            success: function(response) {
                loadKotlinFiles(response.content.files)
            },
            error: function(er) {
                console.error(er)
            }
        })
    }

    if (language == 1) {
        runPHPJsonAjax()
    } else if (language == 2) {
        // runJavaJsonAjax()
    } else if (language == 3) {
        // runKotlinJsonAjax()
    } else {
        runPHPJsonAjax()
        // runJavaJsonAjax()
        // runKotlinJsonAjax()
    }
}

function debugText(innerHTML) {
    document.getElementById(inpDebugId).classList.add("active")
    document.getElementById(inpDebugId).innerHTML = innerHTML
}

$(document).ready(function(e)
{
    Notiflix.Notify.Init({
        failure: {
            textColor:"#000"
        },
        warning: {
            textColor:"#000"
        }
    });

    getMyFiles()
    
    document.getElementsByClassName(myFilesDeleteClass).forEach((myFilesDeleteButton) => {
        myFilesDeleteButton.onclick = function(ev) {
            const language = parseInt(this.getAttribute("language"))
            let selected = null
            let url = ""
            if (language == 1) {
                selected = document.getElementById(phpFilesId)
                url = `\\delete\\php\\${selected.value}`
            } else if (language == 2) {
                selected = document.getElementById(javaFilesId)
                url = `\\delete\\java\\${selected.value}`
            } else if (language == 3) {
                selected = document.getElementById(kotlinFilesId)
                url = `\\delete\\kotlin\\${selected.value}`
            }
            if (selected.value != null && selected.value.length > 0) {
                Notiflix.Confirm.Show(
                    'Atenção',
                    `Tem certeza que deseja remover o ZIP do dia ${selected.querySelector('option:checked').innerHTML}?`,
                    'Sim',
                    'Não',
                    () => {
                        if (url != null && url.length > 0) {
                            jsonAjax({
                                "url": url,
                                "type": "DELETE",
                                success: function(response) {
                                    if (response.ok) {
                                        getMyFiles(language)
    
                                        showMessage(`O ZIP ${selected.querySelector('option:checked').innerHTML} foi removido com sucesso!`, 1)
                                    } else {
                                        showMessage("Oops! Algo deu errado.", 3)
                                        console.error(response.content)
                                    }
                                },
                                error: function(er) {
                                    showMessage("Oops! Algo deu errado.", 3)
                                    console.error(er)
                                }
                            })
                        }
                    },
                    null
                );
            } else {
                showMessage("Nenhum ZIP selecionado", 2)
            }
        }
    })
    
    document.getElementsByClassName(myFilesDownloadClass).forEach((myFilesDownloadButton) => {
        myFilesDownloadButton.onclick = function(ev) {
            const language = parseInt(this.getAttribute("language"))
            let selected = null
            let url = ""
            if (language == 1) {
                selected = document.getElementById(phpFilesId)
                url = `\\download\\php\\${selected.value}`
            } else if (language == 2) {
                selected = document.getElementById(javaFilesId)
                url = `\\download\\java\\${selected.value}`
            } else if (language == 3) {
                selected = document.getElementById(kotlinFilesId)
                url = `\\download\\kotlin\\${selected.value}`
            }
            if (selected.value != null && selected.value.length > 0) {
                if (url != null && url.length > 0) {
                    jsonAjax({
                        "url": url,
                        "type": "GET",
                        success: function(response) {
                            if (response.ok) {
                                downloadFileFromBase64(`${getLanguage().text} Base Files.zip`, response.content.zipBase64)
                            } else {
                                showMessage("Oops! Algo deu errado.", 3)
                                console.error(response.content)
                            }
                        },
                        error: function(er) {
                            showMessage("Oops! Algo deu errado.", 3)
                            console.error(er)
                        }
                    })
                }
            } else {
                showMessage("Nenhum ZIP selecionado", 2)
            }
        }
    })

    // Fetch the form we want to apply custom Bootstrap validation styles to
    const form = document.getElementById(frmWebsiteFormId);

    // Validate and prevent form submission
    form.onsubmit = function(event){
        event.preventDefault();
        event.stopPropagation();
        const validate = form.checkValidity()
        
        if (afterGeneralFormValidation != null) {
            afterGeneralFormValidation(event, validate)
        }
    };

    setOnLanguageChooseFromIndex(function(language) {
        if (language.value == 1) {
            document.getElementById(inpWebsiteTitleLabelId).innerHTML = "Nome do site"
            document.getElementById(phpFilesContainerId).classList.remove("d-none")
            document.getElementById(javaFilesContainerId).classList.add("d-none")
            document.getElementById(kotlinFilesContainerId).classList.add("d-none")
            document.getElementById(inpWebsiteKeywordsContainerId).classList.remove("d-none")
            document.getElementById(divWebsiteGeneralComponentsId).classList.remove("d-none")
            document.getElementById(div404KeywordsId).classList.remove("d-none")
            document.getElementById(divNavLinkPagesId).classList.remove("d-none")
            document.getElementById(divTabPagesId).classList.remove("d-none")

            document.getElementById(divNavLinkFrameworksId).classList.remove("d-none")
            document.getElementById(divTabFrameworksId).classList.remove("d-none")

            document.getElementById(divNavLinkLibsId).classList.add("d-none")
            document.getElementById(divTabLibsId).classList.add("d-none")
        } else {
            document.getElementById(inpWebsiteTitleLabelId).innerHTML = "Nome"
            document.getElementById(phpFilesContainerId).classList.add("d-none")
            document.getElementById(javaFilesContainerId).classList.remove("d-none")
            document.getElementById(kotlinFilesContainerId).classList.add("d-none")
            document.getElementById(inpWebsiteKeywordsContainerId).classList.add("d-none")
            document.getElementById(divWebsiteGeneralComponentsId).classList.add("d-none")
            document.getElementById(div404KeywordsId).classList.add("d-none")
            document.getElementById(divNavLinkPagesId).classList.add("d-none")
            document.getElementById(divTabPagesId).classList.add("d-none")

            if (language.value == 2) {
                document.getElementById(phpFilesContainerId).classList.add("d-none")
                document.getElementById(javaFilesContainerId).classList.add("d-none")
                document.getElementById(kotlinFilesContainerId).classList.remove("d-none")
                document.getElementById(divNavLinkFrameworksId).classList.add("d-none")
                document.getElementById(divTabFrameworksId).classList.add("d-none")

                document.getElementById(divNavLinkLibsId).classList.add("d-none")
                document.getElementById(divTabLibsId).classList.add("d-none")
            } else {
                document.getElementById(divNavLinkLibsId).classList.remove("d-none")
                document.getElementById(divTabLibsId).classList.remove("d-none")

                document.getElementById(divNavLinkFrameworksId).classList.add("d-none")
                document.getElementById(divTabFrameworksId).classList.add("d-none")
            }
        }

        document.getElementById(aDatabaseId).click()
    })

    document.querySelectorAll(".mdb-tooltip").forEach((elem) => {
        new mdb.Tooltip(elem)
    })

    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    });

    document.getElementById(inp404KeywordsId).oninput = function(ev) {
        generatorData.keywords404 = ev.target.value.splitAndTrim()
    };

    document.getElementById(inpWebsiteKeywordsId).oninput = function(ev) {
        generatorData.keywords = ev.target.value.splitAndTrim()
    };

    document.getElementById(inpWebsiteTitleId).onfocus = function(event) {
        if(event.relatedTarget != null && event.relatedTarget.id == btnGenerateFilesId) {
            const validate = this.checkValidity()
            if (!validate) {
                showMessage("Verifique os campos não preenchidos!", 2)
            }
        }
    }

    $("#" + btnGenerateFilesId).unbind().click(function(e)
    {
        afterGeneralFormValidation = function(event, validate) {
            if (validate) {
                setAfterDatabaseFormValidation(function(event, validate) {
                    if (validate) {
                        const data = getGeneratorData()
                        console.log("Generating File...", data);

                        let url = ""
                        if (data.language.value == 1) {
                            url = "/zip/php"
                        } else if (data.language.value == 2) {
                            url = "/zip/java"
                        } else if (data.language.value == 3) {
                            url = "/zip/kotlin"
                        }

                        if (url != null && url.length > 0) {
                            jsonAjax({
                                "url": url,
                                "type": "POST",
                                "data": data,
                                success: function(response) {
                                    console.log(response)

                                    if (response.ok) {
                                        getMyFiles(data.language.value)
    
                                        debugText(response.content.zipBase64)

                                        downloadFileFromBase64(`${data.language.text} Base Files.zip`, response.content.zipBase64)
                                    } else {
                                        showMessage(response.content, 2)
                                    }                                    
                                },
                                error: function(er) {
                                    console.error(er)
                                }
                            })
                        } else {
                            console.error("No language was set")
                        }
                    }
                })

                const databaseForm = getDatabaseForm()
                databaseForm.submitLikeInputPress()
            }
        }
    
        document.getElementById(aDatabaseId).click()
        setTimeout(function() {
            const form = document.getElementById(frmWebsiteFormId)
            form.submitLikeInputPress()

            this.clearTimeout()
        }, 155)
    });
});

export default { showMessage }