const radFrameworksName = "frameworks"
const chkUseCDNId = "use-cdn"

const framework = { "id": 1, "framework": "Bootstrap", "useCDN": false }

$(document).ready(function()
{
    document.getElementsByName(radFrameworksName).forEach((radFramework) => {
        radFramework.onclick = function (ev) {
            const selectedFrameworkLabel = this.parentNode.querySelector("label")
            framework.id = parseInt(this.value)
            framework.framework = selectedFrameworkLabel.innerHTML
        }
    })

    document.getElementById(chkUseCDNId).onchange = function(evt) {
        if (this.checked) {
            framework.useCDN = true
            this.value = "1"
        } else {
            framework.useCDN = false
            this.value = "0"
        }
    }
});

export default function() {
    return framework;
}