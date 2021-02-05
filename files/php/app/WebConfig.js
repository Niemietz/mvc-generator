exports.getText = function() {
    let result =
`<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <location path="Cms">
        <system.webServer>
            <directoryBrowse enabled="false" />
        </system.webServer>
    </location>
</configuration>`

    return result
}