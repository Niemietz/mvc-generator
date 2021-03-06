exports.getText = function() {
    let result =
`<?xml version="1.0" encoding="utf-8"?>
<configuration>
	<system.web>
		<customErrors mode="Off"/>
	</system.web>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="rule 1A" stopProcessing="true">
                    <match url="^(.*)$" />
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="//public/index.php?url={R:1}" appendQueryString="true" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>`

    return result
}