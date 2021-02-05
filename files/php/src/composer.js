exports.getText = function(author, email) {
    let result =
`{
    "name": "mvc_generator/src",
    "authors": [
        {
            "name": "${author}",
            "email": "${email}"
        }
    ],
    "require": {
        "phpmailer/phpmailer": "^6.0"
    },
    "autoload": {
        "psr-4": {
            "\\\\": "../",
            "App\\\\": "../app/",
            "App\\\\Controller\\\\": "../app/controller/",
            "App\\\\Data\\\\": "../app/data/",
            "App\\\\Model\\\\": "../app/model/",
            "Src\\\\": "../src/",
            "Src\\\\Classes\\\\": "../src/classes/",
            "Src\\\\Interfaces\\\\": "../src/interfaces/",
            "Src\\\\Traits\\\\": "../src/traits/"
        }
    }
}`

    return result
}