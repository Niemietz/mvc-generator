import { getLanguage } from '/javascripts/views/language-chooser.js';
import { setOnLanguageChooseFromIndex } from '/javascripts/views/language-chooser.js';
import { setAfterDatabaseFormValidation, getDatabase, getDatabaseForm } from '/javascripts/tabs/database.js';
import getFramework from '/javascripts/tabs/framework.js';
import getLibsVersions from '/javascripts/tabs/libs.js';
import getModels from '/javascripts/tabs/model-adder.js';
import { getPages } from '/javascripts/tabs/page-adder.js';

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
const btnGenerateFilesId = "generate-files";
const inpWebsiteKeywordsId = "website-keywords";
const divWebsiteKeywordsId = "website-keywords-container";

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

const generatorData = {
    "keywords": [],
    "database": null,
    "language": null,
    "framework": null,
    "models": [],
    "libsVersions": [],
    "pages": []
}

function getGeneratorData() {
    generatorData.keywords = document.getElementById(inpWebsiteKeywordsId).value.splitAndTrim()
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

    setOnLanguageChooseFromIndex(function(language) {
        if (language.value == 1) {
            document.getElementById(divWebsiteKeywordsId).classList.remove("d-none")
            document.getElementById(divNavLinkPagesId).classList.remove("d-none")
            document.getElementById(divTabPagesId).classList.remove("d-none")

            document.getElementById(divNavLinkFrameworksId).classList.remove("d-none")
            document.getElementById(divTabFrameworksId).classList.remove("d-none")

            document.getElementById(divNavLinkLibsId).classList.add("d-none")
            document.getElementById(divTabLibsId).classList.add("d-none")
        } else {
            document.getElementById(divWebsiteKeywordsId).classList.add("d-none")
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

    $("#" + btnGenerateFilesId).unbind().click(function(e)
    {
        setAfterDatabaseFormValidation(function(event, validate) {
            if (validate) {
                console.log("Generating File...", getGeneratorData());
            }
        })
        document.getElementById(aDatabaseId).click()
        setTimeout(function() {
            const databaseForm = getDatabaseForm()
            databaseForm.submitLikeInputPress()
            this.clearTimeout()
        }, 155)
    });

    document.getElementById(inpWebsiteKeywordsId).oninput = function(ev) {
        generatorData.keywords = ev.target.value.splitAndTrim()
    };
});

export default { showMessage }