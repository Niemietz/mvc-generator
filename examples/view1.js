/*** ELEMENTS AND VARIABLES ***/

// HTML ELEMENTS
const currentScriptId = "script-login";

const divLoadingId = "loading";
const divContentId = "content";

const lblLoadingId = "loading-text";

const inpLoginId = "cpf";
const inpPasswordId = "password";

const btnLoginId = "login-button";
const btnSignInId = "signin-button";

// CONTROLLERS AND ACTIONS

const controller = controllerDirectory + "Index.php";
const someAction = "some";

// GLOBAL VARIABLES

let someVar = null;

/*** PRIVATE FUNCTIONS ***/

/**
 * @function setPageStatus
 * @param {Number} status - 1 - Loading / 2 - Stop Loading (Show Content)
 * @param {String} loadingText - Loading Message (Default: "Carregando...") */
function setPageStatus(status, loadingText = "Carregando...")
{
    $('#' + lblLoadingId).html(loadingText);

    switch(status)
    {
        case 1:

            $('#' + divContentId).hide();
            $('#' + divLoadingId).show();

            break;
        case 2:

            $('#' + divContentId).show();
            $('#' + divLoadingId).hide();

            break;
    }    
}

/**
 * @function viewOk */
function viewOk()
{
    let result = true;

    // nothing

    return result;
}

$(window).resize(function(e)
{
    // nothing
});

$(document).ready(function()
{
    /*** ON START / PAGE SETUP ***/
    try
    {
        new Swiper('.swiper-container', {
            slidesPerView: 3,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    catch(ex)
    {
        showMessage(ex, 3);

        setPageStatus(2);
    }

    /*** EVENTS ***/

    // ON LOGIN CLICKED
    $("#" + btnLoginId).unbind().click(function(e)
    {
        console.log("Login button clicked.");
    });

    // ON SIGN IN CLICKED
    $("#" + btnSignInId).unbind().click(function(e)
    {
        console.log("Sign-in button clicked.");
    });
});