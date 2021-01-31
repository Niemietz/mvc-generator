export default function(loadingText, loadingTextClass, loadingClass, contentClass, loadingModalClass, contentModalClass) {
    let result =
`const loadingTextClass = "${loadingTextClass}";
const loadingClass = "${loadingClass}";
const contentClass = "${contentClass}";
const loadingModalClass = "${loadingModalClass}";
const contentModalClass = "${contentModalClass}";

/**
 * It shows an small alert to the user, using Notiflix
 *
 * @param {String} message - Message to be shown
 * @param {Number} type - 1: Success / 2: Error / 3: Warning / 4: Info / 5: Question
 * @param {Boolean} alert - Show message with default browser's alert
 */
function showNotification(message, type = 4, useAlert = false)
{
    let preText = "Erro";
    if(type == 1)
    {
        preText = "Mensagem";
    }
    else if(type == 3)
    {
        preText = "Aviso";
    }
    else if(type == 4)
    {
        preText = "Informação";
    }
    else if(type == 5)
    {
        preText = "Questão";
    }

    let text = preText + " desconhecido(a)!";
    if(message != null && typeof message == "string" && message.length > 0)
    {
        text = message;
    }
    else if(message != null && message.message != null && message.message.length > 0)
    {
        text = message.message;
    }

    if(type == 2)
    {
        console.error(text);
    }
    else if(type == 3 || type == 4 || type == 5)
    {
        console.warn(text);
    }
    else
    {
        console.log(text);
    }

    if(useAlert)
    {
        alert(text);
    }
    else
    {
        if(type == 1)
        {
            Notiflix.Notify.Success(message)
        }
        else if(type == 2)
        {
            Notiflix.Notify.Failure(message)
        }
        else if(type == 3 || type == 5)
        {
            Notiflix.Notify.Warn(message)
        }
        else
        {
            Notiflix.Notify.Info(message)
        }
    }
}

/**
 * It shows an fullscreen alert to the user, using SweetAlert2
 * 
 * @param {String} message - Message to be shown
 * @param {Number} type - 1: Success / 2: Error / 3: Warning / 4: Info / 5: Question
 * @param {Boolean} alert - Show message with default browser's alert
 */
function showMessage(message, type = 4, useAlert = false)
{
    let preText = "Erro";
    if(type == 1)
    {
        preText = "Mensagem";
    }
    else if(type == 3)
    {
        preText = "Aviso";
    }
    else if(type == 4)
    {
        preText = "Informação";
    }
    else if(type == 5)
    {
        preText = "Questão";
    }

    let text = preText + " desconhecido(a)!";
    if(message != null && typeof message == "string" && message.length > 0)
    {
        text = message;
    }
    else if(message != null && message.message != null && message.message.length > 0)
    {
        text = message.message;
    }

    if(type == 2)
    {
        console.error(text);
    }
    else if(type == 3 || type == 4 || type == 5)
    {
        console.warn(text);
    }
    else
    {
        console.log(text);
    }
    
    if(useAlert)
    {
        alert(text);
    }
    else
    {
        let titleStr = 'Aviso';
        let typeStr = 'info';
        if(type == 1)
        {
            titleStr = 'Concluído';
            typeStr = 'success';
        }
        else if(type == 2)
        {
            titleStr = 'Oops';
            typeStr = 'error';
        }
        else if(type == 3)
        {
            titleStr = 'Atenção';
            typeStr = 'warning';
        }
        else if(type == 5)
        {
            typeStr = 'question';
        }
    
        Swal.fire({
            "type": typeStr,
            title: titleStr,
            "text": text,
            showCloseButton: true,
            showConfirmButton: false
        });
    }
}

/**
 * It changes the page state, from to loading to idle
 * 
 * @param {Boolean} status - If true it changes the page to load state, otherwise it shows all the content
 */
function setLoading(status)
{
    if(status)
    {
        document.querySelectorAll(\`.\${loadingClass}\`).forEach(function (loadingElem) {
            loadingElem.style.removeProperty("display");
        });
        document.querySelectorAll(\`.\${contentClass}\`).forEach(function (contentElem) {
            contentElem.style.display = "none";
        });
    }
    else
    {
        document.querySelectorAll(\`.\${loadingClass}\`).forEach(function (loadingElem) {
            loadingElem.style.display = "none";
        });
        document.querySelectorAll(\`.\${contentClass}\`).forEach(function (contentElem) {
            contentElem.style.removeProperty("display");
        });
    }
}

// TODO - Needs some review
/**
 * @deprecated - Needs some revision before using it on MVC Generator
 */
function lockModal(modal)
{
    const options = {
        keyboard: false,
        backdrop: "static"
    };

    modal.off('keyup');
    modal.data('bs.modal')._config.keyboard = options.keyboard;
    modal.data('bs.modal')._config.backdrop = options.backdrop;

    return options;
}

// TODO - Needs some revision
/**
 * @deprecated - Needs some revision before using it on MVC Generator
 */
function unlockModal(modal)
{
    const options = {
        keyupEvent: function (event) {
            if (event.which === 27) {
                $(this).data("bs.modal").hide();
            }
        },
        backdrop: true
    };

    modal.on('keyup', options.keyupEvent);
    modal.data('bs.modal')._config.backdrop = options.backdrop;

    return options;
}

// TODO - Needs some review
/**
 * It changes the modal state, from to loading to idle
 * 
 * @param {Boolean} status - If true it changes the modal to load state, otherwise it shows all the content
 * @deprecated - Needs some revision before using it on MVC Generator
 */
function setLoadingModal(status, modal = null)
{
    if(status)
    {
        if(modal != null && typeof modal.data("bs.modal") != undefined)
        {
            lockModal(modal);
            modal.find(".modal-header").find("button").addClass("d-none");
            modal.find(".modal-footer").addClass("d-none");
            modal.find(".confirmacao-excluir").addClass("d-none");
        }

        document.querySelectorAll(\`.\${loadingModalClass}\`).forEach(function (loadingElem) {
            loadingElem.style.removeProperty("display");
        });
        document.querySelectorAll(\`.\${contentModalClass}\`).forEach(function (contentElem) {
            contentElem.style.display = "none";
        });
    }
    else
    {
        if(modal != null && typeof modal.data("bs.modal") != undefined)
        {
            unlockModal(modal);
            modal.find(".modal-header").find("button").removeClass("d-none");
            modal.find(".modal-footer").removeClass("d-none");
            modal.find(".confirmacao-excluir").addClass("d-none");
        }

        document.querySelectorAll(\`.\${loadingClass}\`).forEach(function (loadingElem) {
            loadingElem.style.display = "none";
        });
        document.querySelectorAll(\`.\${contentClass}\`).forEach(function (contentElem) {
            contentElem.style.removeProperty("display");
        });
    }
}

/**
 * It sets a new text at the loading view
 *
 * @param {String} text - Text to be set at the loading view
 */
function setLoadingText(text = "${loadingText}")
{
    document.querySelectorAll(\`.\${loadingTextClass}\`).forEach(function (loadingElem) {
        loadingElem.innerHTML = text;
    });
}

/**
 * It sets back the default  text at the loading view, "Loading..."
 */
function resetLoadingText()
{
    document.querySelectorAll(\`.\${loadingTextClass}\`).forEach(function (loadingElem) {
        loadingElem.innerHTML = "${loadingText}";
    });
}

document.addEventListener(contentLoadedEventListener, (event) => {
    Notiflix.Notify.Init({
        failure: {
            textColor:"#000"
        },
        warning: {
            textColor:"#000"
        }
    });
    
    setLoading(false);
    // setLoadingModal(false); // TODO - Needs some review
});`

    return result
}