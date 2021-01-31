import { getLanguage } from '/javascripts/views/language-chooser.js';
import { setOnLanguageChooseFromIndex } from '/javascripts/views/language-chooser.js';

// Models
import getModelsText from '/javascripts/files/php/app/model/Models.js';
import getModelText from '/javascripts/files/php/app/model/Model.js';

// Data
import getDAOText from '/javascripts/files/php/app/data/DAO.js';

// Javascripts
import getMainJSText from '/javascripts/files/php/public/js/view/main.js';
import getAPIJSText from '/javascripts/files/php/public/js/api.js';
import getIndexJSText from '/javascripts/files/php/public/js/index.js';

// Classes
import getRenderText from '/javascripts/files/php/src/classes/Render.js';
import getRoutesText from '/javascripts/files/php/src/classes/Routes.js';

import { setAfterDatabaseFormValidation, getDatabase, getDatabaseForm } from '/javascripts/tabs/database.js';
import getFramework from '/javascripts/tabs/framework.js';
import getLibsVersions from '/javascripts/tabs/libs.js';
import getModels from '/javascripts/tabs/model-adder.js';
import { getPages } from '/javascripts/tabs/page-adder.js';

const inpDebugId = "debug";

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
const divWebsiteGeneralId = "website-general-container";
const frmWebsiteFormId = "website-form";
const inpWebsiteTitleId = "website-title";
const inpWebsiteKeywordsId = "website-keywords";
const inp404KeywordsId = "404-keywords";
const inpWebsiteTitleName = "website-title";
const inpWebsiteAuthorName = "website-author";
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
    generatorData.description = formData[inpWebsiteDescriptionName]
    generatorData.keywords404 = formData[inp404KeywordsName].splitAndTrim()
    generatorData.keywords = formData[inpWebsiteKeywordsName].splitAndTrim()

    generatorData.loadingText = formData[inpLoadingTextName]
    generatorData.loadingClass = formData[inpLoadingClassName]
    generatorData.loadingTextClass = formData[inpLoadingTextClassName]
    generatorData.loadingModalClass = formData[inpLoadingModalClassName]
    generatorData.contentClass = formData[inpContentClassName]
    generatorData.contentModalClass = formData[inpContentModalClassName]

    generatorData.database = getDatabase()
    generatorData.language = getLanguage()
    generatorData.models = getModels()
    if (generatorData.language.value == 1) {
        generatorData.pages = getPages()
        generatorData.framework = getFramework()
    } else {
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
            document.getElementById(divWebsiteGeneralId).classList.remove("d-none")
            document.getElementById(div404KeywordsId).classList.remove("d-none")
            document.getElementById(divNavLinkPagesId).classList.remove("d-none")
            document.getElementById(divTabPagesId).classList.remove("d-none")

            document.getElementById(divNavLinkFrameworksId).classList.remove("d-none")
            document.getElementById(divTabFrameworksId).classList.remove("d-none")

            document.getElementById(divNavLinkLibsId).classList.add("d-none")
            document.getElementById(divTabLibsId).classList.add("d-none")
        } else {
            document.getElementById(divWebsiteGeneralId).classList.add("d-none")
            document.getElementById(div404KeywordsId).classList.add("d-none")
            document.getElementById(divNavLinkPagesId).classList.add("d-none")
            document.getElementById(divTabPagesId).classList.add("d-none")

            if (language.value == 2) {
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
        if(event.relatedTarget != null) {
            if(event.relatedTarget.id == btnGenerateFilesId) {
                const validate = this.checkValidity()
                if (!validate) {
                    showMessage("Verifique os campos não preenchidos!", 2)
                }
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

                        jsonAjax({
                            "url": "/zip/php",
                            "type": "POST",
                            "data": data,
                            success: function(response) {
                                console.log(response)
                            },
                            error: function(er) {
                                console.error(er)
                            }
                        })
                        
                        debugText(getRenderText(data.pages))
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