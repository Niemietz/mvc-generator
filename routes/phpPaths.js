var path = require('path');
var config = require('./config');

const phpZipPath = path.join(require.main.filename, `/../../files/php/zip`)

const phpFilesPath = config.phpFilesPath

// APP
const appPath = path.join(phpFilesPath, '/app')

// CONTROLLER
const controllerPath = path.join(phpFilesPath, '/app/controller')

// DATA
const dataPath = path.join(phpFilesPath, '/app/data')

// MODEL
const modelPath = path.join(phpFilesPath, '/app/model')
const modelInterfacePath = path.join(phpFilesPath, '/app/model/_Interface')
const modelSuperClassPath = path.join(phpFilesPath, '/app/model/SuperClass')

// VIEW
const viewPath = path.join(phpFilesPath, '/app/view')
const view404Path = path.join(phpFilesPath, '/app/view/404')
const viewAddEditFormPath = path.join(phpFilesPath, '/app/view/addEditForm')
const viewAddFormPath = path.join(phpFilesPath, '/app/view/addForm')
const viewHomePath = path.join(phpFilesPath, '/app/view/home')
const viewListWithAddPath = path.join(phpFilesPath, '/app/view/listWithAdd')
const viewListWithAddModalsPath = path.join(phpFilesPath, '/app/view/listWithAdd/modals')
const viewListWithAddEditPath = path.join(phpFilesPath, '/app/view/listWithAddEdit')
const viewListWithAddEditModalsPath = path.join(phpFilesPath, '/app/view/listWithAddEdit/modals')
const viewListWithAddEditRemovePath = path.join(phpFilesPath, '/app/view/listWithAddEditRemove')
const viewListWithAddEditRemoveModalsPath = path.join(phpFilesPath, '/app/view/listWithAddEditRemove/modals')
const viewListWithAddRemovePath = path.join(phpFilesPath, '/app/view/listWithAddRemove')
const viewListWithAddRemoveModalsPath = path.join(phpFilesPath, '/app/view/listWithAddRemove/modals')
const viewListWithEditPath = path.join(phpFilesPath, '/app/view/listWithEdit')
const viewListWithEditModalsPath = path.join(phpFilesPath, '/app/view/listWithEdit/modals')
const viewListWithEditRemovePath = path.join(phpFilesPath, '/app/view/listWithEditRemove')
const viewListWithEditRemoveModalsPath = path.join(phpFilesPath, '/app/view/listWithEditRemove/modals')
const viewListWithRemovePath = path.join(phpFilesPath, '/app/view/listWithRemove')
const viewSimplePath = path.join(phpFilesPath, '/app/view/simple')
const viewSimpleListPath = path.join(phpFilesPath, '/app/view/simpleList')

// CONFIG
const configPath = path.join(phpFilesPath, '/config')

// PUBLIC
const publicPath = path.join(phpFilesPath, '/public')
const publicJSPath = path.join(phpFilesPath, '/public/js')
const publicCSSPath = path.join(phpFilesPath, '/public/css')
const publicJSViewPath = path.join(phpFilesPath, '/public/js/view')

// SOURCE
const sourcePath = path.join(phpFilesPath, '/src')
const sourceClassesPath = path.join(phpFilesPath, '/src/classes')
const sourceInterfacesPath = path.join(phpFilesPath, '/src/interfaces')
const sourceTraitsPath = path.join(phpFilesPath, '/src/traits')

module.exports = {
    "phpZipPath": phpZipPath,
    
    "phpPath": phpFilesPath,

    // APP
    "appPath": appPath,

    // CONTROLLER
    "controllerPath": controllerPath,
    
    // DATA
    "dataPath": dataPath,

    // MODEL
    "modelPath": modelPath,
    "modelInterfacePath": modelInterfacePath,
    "modelSuperClassPath": modelSuperClassPath,

    // VIEW
    "viewPath": viewPath,
    "view404Path": view404Path,
    "viewAddEditFormPath": viewAddEditFormPath,
    "viewAddFormPath": viewAddFormPath,
    "viewHomePath": viewHomePath,
    "viewListWithAddPath": viewListWithAddPath,
    "viewListWithAddModalsPath": viewListWithAddModalsPath,
    "viewListWithAddEditPath": viewListWithAddEditPath,
    "viewListWithAddEditModalsPath": viewListWithAddEditModalsPath,
    "viewListWithAddEditRemovePath": viewListWithAddEditRemovePath,
    "viewListWithAddEditRemoveModalsPath": viewListWithAddEditRemoveModalsPath,
    "viewListWithAddRemovePath": viewListWithAddRemovePath,
    "viewListWithAddRemoveModalsPath": viewListWithAddRemoveModalsPath,
    "viewListWithEditPath": viewListWithEditPath,
    "viewListWithEditModalsPath": viewListWithEditModalsPath,
    "viewListWithEditRemovePath": viewListWithEditRemovePath,
    "viewListWithEditRemoveModalsPath": viewListWithEditRemoveModalsPath,
    "viewListWithRemovePath": viewListWithRemovePath,
    "viewSimplePath": viewSimplePath,
    "viewSimpleListPath": viewSimpleListPath,

    // CONFIG
    "configPath": configPath,

    // PUBLIC
    "publicPath": publicPath,
    "publicJSPath": publicJSPath,
    "publicCSSPath": publicCSSPath,
    "publicJSViewPath": publicJSViewPath,

    // SOURCE
    "sourcePath": sourcePath,
    "sourceClassesPath": sourceClassesPath,
    "sourceInterfacesPath": sourceInterfacesPath,
    "sourceTraitsPath": sourceTraitsPath
}