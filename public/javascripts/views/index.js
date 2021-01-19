import getLanguage from '/javascripts/views/language-chooser.js';
import getDatabase from '/javascripts/tabs/database.js';
import getFramework from '/javascripts/tabs/framework-libs.js';
import getModels from '/javascripts/tabs/model-adder.js';
import { getPages } from '/javascripts/tabs/page-adder.js';

const btnNavLinkClass = "nav-link";
const divContentClass = "content";
const divLoadingClass = "loading";
const txtLoadingClass = "loading-text";
const btnGenerateFilesId = "generate-files";

function showMessage(message, type = null, log = true)
{
    let title = "Informação";
    let typeClass = "primary";

    switch(type)
    {
        case 1:

            title = "Sucesso";
            typeClass = "success";

            if(log)
            {
                console.log(message);
            }

        break;
            case 2:

            title = "Aviso";
            typeClass = "warning";

            if(log)
            {
                console.warn(message);
            }

            break;
        case 3:

            title = "Erro";
            typeClass = "danger";

            if(log)
            {
                console.error(message);
            }

            break;
        default:
                
            if(log)
            {
                console.log(message);
            }
    }

    $.notify({
        "title": "<b>" + title + "</b><hr>",
        "message": message,
    },
    {
        "type": typeClass,                    
        "animate": {
            "enter": 'animated bounceInDown',
            "exit": 'animated bounceOutUp'
        }
    });
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

function getGeneratorData() {
    return {
        "database": getDatabase(),
        "language": getLanguage(),
        "framework": getFramework(),
        "models": getModels(),
        "pages": getPages()
    }
}

$(document).ready(function(e)
{
    document.querySelectorAll(".mdb-tooltip").forEach((elem) => {
        new mdb.Tooltip(elem)
    })

    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    });

    $("#" + btnGenerateFilesId).unbind().click(function(e)
    {
        console.log("Generating File...", getGeneratorData());
    });
});