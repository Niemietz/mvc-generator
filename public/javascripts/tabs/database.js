const divDatabaseServersClass = "database-servers";
const divDatabaseServerClass = "database-server";
const frmDatabaseServerId = "database-form"
const inpHostId = "database-host"
const inpUserId = "database-user"
const inpPasswordId = "database-password"
const inpDatabaseId = "database"
const btnShowPasswordId = "show-password"

const database = {
    "host": "",
    "user": "",
    "password": "",
    "database": "",
    "databaseServer": {
        "value": 1,
        "text": "MySQL"
    }
};
let afterDatabaseFormValidation = null;

(function($) {
    $.fn.getSelectedDatabaseServerValue = function()
    {
        if($(this).hasClass(divDatabaseServersClass))
        {
            return parseInt($(this).find("." + divDatabaseServerClass + "[checked]").attr("value"));
        }
        else
        {
            console.error("Could not get database server value: Invalid element.");
        }
    }

    $.fn.getSelectedDatabaseServerText = function()
    {
        if($(this).hasClass(divDatabaseServersClass))
        {
            return $(this).find("." + divDatabaseServerClass + "[checked]").find("span").html();
        }
        else
        {
            console.error("Could not get database server text: Invalid element.");
        }
    }

    $.fn.getSelectedDatabaseServer = function()
    {
        if($(this).hasClass(divDatabaseServersClass))
        {
            const value = $(this).getSelectedDatabaseServerValue();
            const text = $(this).getSelectedDatabaseServerText();

            return { "value": value, "text": text };
        }
        else
        {
            console.error("Could not get database server text: Invalid element.");
        }
    }
})(jQuery);

function updateFormRequirements() {
    const inpHost = document.getElementById(inpHostId)
    const inpUser = document.getElementById(inpUserId)
    const inpPassword = document.getElementById(inpPasswordId)
    const inpDatabase = document.getElementById(inpDatabaseId)
    if ((inpHost.value != null && inpHost.value.length) > 0 ||
        (inpUser.value != null && inpUser.value.length) > 0 ||
        (inpPassword.value != null && inpPassword.value.length) > 0 ||
        (inpDatabase.value != null && inpDatabase.value.length) > 0) {
        inpHost.setAttribute("required", true)
        inpUser.setAttribute("required", true)
        inpPassword.setAttribute("required", true)
        inpDatabase.setAttribute("required", true)
    } else {
        inpHost.removeAttribute("required")
        inpUser.removeAttribute("required")
        inpPassword.removeAttribute("required")
        inpDatabase.removeAttribute("required")
    }
}

$(document).ready(function()
{
    // Fetch the form we want to apply custom Bootstrap validation styles to
    const form = document.getElementById(frmDatabaseServerId);

    // Validate and prevent form submission
    form.onsubmit = function(event){
        event.preventDefault();
        event.stopPropagation();
        const validate = form.checkValidity()
        
        if (afterDatabaseFormValidation != null) {
            afterDatabaseFormValidation(event, validate)
        }
    };

    database.databaseServer = $("." + divDatabaseServersClass).getSelectedDatabaseServer();

    $("." + divDatabaseServerClass).click(function(e)
    {
        $("." + divDatabaseServerClass).removeAttr("checked");
        $(this).attr("checked", "true");

        database.databaseServer.text = $(this).find("span").html()
        database.databaseServer.value = parseInt($(this).attr("value"))
    });

    document.getElementById(btnShowPasswordId).onclick = function(ev) {
        if (this.hasAttribute("show")) {
            const hideIcon = document.createElement("i");
            hideIcon.classList.add("fas")
            hideIcon.classList.add("fa-eye-slash")

            document.getElementById(inpPasswordId).type = "text"
            this.querySelector("i").remove()

            this.append(hideIcon)
            this.removeAttribute("show")
        } else {
            const showIcon = document.createElement("i");
            showIcon.classList.add("fas")
            showIcon.classList.add("fa-eye")

            this.querySelector("i").remove()
            document.getElementById(inpPasswordId).type = "password"

            this.append(showIcon)
            this.setAttribute("show", true)
        }
    }

    document.getElementById(inpHostId).oninput = function(ev) {
        database.host = ev.target.value
        updateFormRequirements()
    }

    document.getElementById(inpUserId).oninput = function(ev) {
        database.user = ev.target.value
        updateFormRequirements()
    }

    document.getElementById(inpPasswordId).oninput = function(ev) {
        database.password = ev.target.value
        updateFormRequirements()
    }

    document.getElementById(inpDatabaseId).oninput = function(ev) {
        database.database = ev.target.value
        updateFormRequirements()
    }
});

export function setAfterDatabaseFormValidation(listener) {
    afterDatabaseFormValidation = listener
}

export function getDatabase() {
    return database
}

export function getDatabaseForm() {
    return document.getElementById(frmDatabaseServerId)
}

export default { setAfterDatabaseFormValidation, getDatabase, getDatabaseForm }