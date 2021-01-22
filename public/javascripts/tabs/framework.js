const radFrameworksName = "frameworks"

const framework = { "id": 1, "framework": "Bootstrap" }

$(document).ready(function()
{
    document.getElementsByName(radFrameworksName).forEach((radFramework) => {
        radFramework.onclick = function (ev) {
            const selectedFrameworkLabel = this.parentNode.querySelector("label")
            framework.id = parseInt(this.value)
            framework.framework = selectedFrameworkLabel.innerHTML
        }
    })
});

export default function() {
    return framework;
}