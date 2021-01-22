const divLanguagesClass = "languages";
const divLanguageClass = "language";

let onLanguageChooseFromIndex = null
let onLanguageChooseFromFrameworksAndLibs = null

let language = { "value": 1, "text": "PHP" };

(function($) {
    $.fn.getSelectedLanguageValue = function()
    {
        if($(this).hasClass("languages"))
        {
            return parseInt($(this).find("." + divLanguageClass + "[checked]").attr("value"));
        }
        else
        {
            console.error("Could not get language value: Invalid element.");
        }
    }

    $.fn.getSelectedLanguageText = function()
    {
        if($(this).hasClass("languages"))
        {
            return $(this).find("." + divLanguageClass + "[checked]").find("span").html();
        }
        else
        {
            console.error("Could not get language text: Invalid element.");
        }
    }

    $.fn.getSelectedLanguage = function()
    {
        if($(this).hasClass("languages"))
        {
            const value = $(this).getSelectedLanguageValue();
            const text = $(this).getSelectedLanguageText();

            return { "value": value, "text": text };
        }
        else
        {
            console.error("Could not get language text: Invalid element.");
        }
    }
})(jQuery);

function onLanguageChoose(language) {
    if (onLanguageChooseFromIndex != null) {
        onLanguageChooseFromIndex(language)
    }
    if (onLanguageChooseFromFrameworksAndLibs != null) {
        onLanguageChooseFromFrameworksAndLibs(language)
    }
}

$(document).ready(function()
{
    language = $("." + divLanguagesClass).getSelectedLanguage();

    $("." + divLanguageClass).click(function(e)
    {
        $("." + divLanguageClass).removeAttr("checked");
        $(this).attr("checked", "true");

        language.text = $(this).find("span").html()
        language.value = parseInt($(this).attr("value"))

        onLanguageChoose(language)
    });
});

export function setOnLanguageChooseFromIndex(listener) {
    onLanguageChooseFromIndex = listener
}

export function setOnLanguageChooseFromFrameworksAndLibs(listener) {
    onLanguageChooseFromFrameworksAndLibs = listener
}

export function getLanguage() {
    return language
}

export default {
    getLanguage,
    setOnLanguageChooseFromIndex,
    setOnLanguageChooseFromFrameworksAndLibs
}