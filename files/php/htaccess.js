exports.getText = function() {
    let result =
`RewriteEngine on
RewriteBase /public_html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ /public/index.php?url=$1 [QSA,L]`

    return result
}