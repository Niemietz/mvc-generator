import getLanguage from '/javascripts/tabs/language-chooser.js';

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

$(document).ready(function(e)
{
    $('[data-toggle="tooltip"]').tooltip()
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    });

    $("#" + btnGenerateFilesId).unbind().click(function(e)
    {
        console.log("Generating File...", getLanguage());
    });
});