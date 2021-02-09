var express = require('express');
var router = express.Router();
var php = require('./phpPaths');
var utils = require('./utils');
var fs = require('fs');

var AdmZip = require('adm-zip');

/**
 * It replaces all occurrences in String
 */
String.prototype.replaceAll = function(search, replacement) {
    let target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
}

String.prototype.capitaliseFirstLetter = function() {
    try {
        return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
            return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    } catch (ex) {
        throw "Could not capitalize first letter of string \"" + this + "\"!\n\n" + ex;
    }
}

var jsonParser = function (req, res, next) {
	req.body = JSON.parse(Object.keys(req.body)[0])

	next()
}

const htaccess = require(`${php.phpPath}\\htaccess.js`)
const WebConfig = require(`${php.phpPath}\\WebConfig.js`)

// APP
const Dispatch = require(`${php.appPath}\\Dispatch.js`)
const appHtaccess = require(`${php.appPath}\\htaccess.js`)
const appWebConfig = require(`${php.appPath}\\WebConfig.js`)

// CONTROLLER
const Controller404 = require(`${php.controllerPath}\\Controller404.js`)
const ControllerAPI = require(`${php.controllerPath}\\ControllerAPI.js`)
const ControllerHome = require(`${php.controllerPath}\\ControllerHome.js`)
const ControllerPage = require(`${php.controllerPath}\\ControllerPage.js`)
const eController = require(`${php.controllerPath}\\eController.js`)

// DATA
const DAO = require(`${php.dataPath}\\DAO.js`)

// MODEL
const iModel = require(`${php.modelInterfacePath}\\iModel.js`)

const eModel = require(`${php.modelSuperClassPath}\\eModel.js`)
const eModelList = require(`${php.modelSuperClassPath}\\eModelList.js`)
const eSuper = require(`${php.modelSuperClassPath}\\eSuper.js`)
const JsonSerializable = require(`${php.modelSuperClassPath}\\JsonSerializable.js`)

const Model = require(`${php.modelPath}\\Model.js`)
const Models = require(`${php.modelPath}\\Models.js`)

// VIEW
const footer = require(`${php.viewPath}\\footer.js`)
const main = require(`${php.viewPath}\\main.js`)
const topbar = require(`${php.viewPath}\\topbar.js`)

const _404Content = require(`${php.view404Path}\\content.js`)
const _404Footer = require(`${php.view404Path}\\footer.js`)
const _404Head = require(`${php.view404Path}\\head.js`)
const _404Header = require(`${php.view404Path}\\header.js`)

const addEditFormContent = require(`${php.viewAddEditFormPath}\\content.js`)
const addEditFormFooter = require(`${php.viewAddEditFormPath}\\footer.js`)
const addEditFormHead = require(`${php.viewAddEditFormPath}\\head.js`)
const addEditFormHeader = require(`${php.viewAddEditFormPath}\\header.js`)

const addFormContent = require(`${php.viewAddFormPath}\\content.js`)
const addFormFooter = require(`${php.viewAddFormPath}\\footer.js`)
const addFormHead = require(`${php.viewAddFormPath}\\head.js`)
const addFormHeader = require(`${php.viewAddFormPath}\\header.js`)

const homeContent = require(`${php.viewHomePath}\\content.js`)
const homeFooter = require(`${php.viewHomePath}\\footer.js`)
const homeHead = require(`${php.viewHomePath}\\head.js`)
const homeHeader = require(`${php.viewHomePath}\\header.js`)

const listWithAddContent = require(`${php.viewListWithAddPath}\\content.js`)
const listWithAddFooter = require(`${php.viewListWithAddPath}\\footer.js`)
const listWithAddHead = require(`${php.viewListWithAddPath}\\head.js`)
const listWithAddHeader = require(`${php.viewListWithAddPath}\\header.js`)

const listWithAddModalsContent = require(`${php.viewListWithAddModalsPath}\\addModel.js`)

const listWithAddEditContent = require(`${php.viewListWithAddEditPath}\\content.js`)
const listWithAddEditFooter = require(`${php.viewListWithAddEditPath}\\footer.js`)
const listWithAddEditHead = require(`${php.viewListWithAddEditPath}\\head.js`)
const listWithAddEditHeader = require(`${php.viewListWithAddEditPath}\\header.js`)

const listWithAddEditModalsContent = require(`${php.viewListWithAddEditModalsPath}\\addEditModel.js`)

const listWithAddEditRemoveContent = require(`${php.viewListWithAddEditRemovePath}\\content.js`)
const listWithAddEditRemoveFooter = require(`${php.viewListWithAddEditRemovePath}\\footer.js`)
const listWithAddEditRemoveHead = require(`${php.viewListWithAddEditRemovePath}\\head.js`)
const listWithAddEditRemoveHeader = require(`${php.viewListWithAddEditRemovePath}\\header.js`)

const listWithAddEditRemoveModalsContent = require(`${php.viewListWithAddEditRemoveModalsPath}\\addEditModel.js`)

const listWithAddRemoveContent = require(`${php.viewListWithAddRemovePath}\\content.js`)
const listWithAddRemoveFooter = require(`${php.viewListWithAddRemovePath}\\footer.js`)
const listWithAddRemoveHead = require(`${php.viewListWithAddRemovePath}\\head.js`)
const listWithAddRemoveHeader = require(`${php.viewListWithAddRemovePath}\\header.js`)

const listWithAddRemoveModalsContent = require(`${php.viewListWithAddRemoveModalsPath}\\addModel.js`)

const listWithEditContent = require(`${php.viewListWithEditPath}\\content.js`)
const listWithEditFooter = require(`${php.viewListWithEditPath}\\footer.js`)
const listWithEditHead = require(`${php.viewListWithEditPath}\\head.js`)
const listWithEditHeader = require(`${php.viewListWithEditPath}\\header.js`)

const listWithEditModalsContent = require(`${php.viewListWithEditModalsPath}\\editModel.js`)

const listWithEditRemoveContent = require(`${php.viewListWithEditRemovePath}\\content.js`)
const listWithEditRemoveFooter = require(`${php.viewListWithEditRemovePath}\\footer.js`)
const listWithEditRemoveHead = require(`${php.viewListWithEditRemovePath}\\head.js`)
const listWithEditRemoveHeader = require(`${php.viewListWithEditRemovePath}\\header.js`)

const listWithEditRemoveModalsContent = require(`${php.viewListWithEditRemoveModalsPath}\\editModel.js`)

const listWithRemoveContent = require(`${php.viewListWithRemovePath}\\content.js`)
const listWithRemoveFooter = require(`${php.viewListWithRemovePath}\\footer.js`)
const listWithRemoveHead = require(`${php.viewListWithRemovePath}\\head.js`)
const listWithRemoveHeader = require(`${php.viewListWithRemovePath}\\header.js`)

const simpleContent = require(`${php.viewSimplePath}\\content.js`)
const simpleFooter = require(`${php.viewSimplePath}\\footer.js`)
const simpleHead = require(`${php.viewSimplePath}\\head.js`)
const simpleHeader = require(`${php.viewSimplePath}\\header.js`)

const simpleListContent = require(`${php.viewSimpleListPath}\\content.js`)
const simpleListFooter = require(`${php.viewSimpleListPath}\\footer.js`)
const simpleListHead = require(`${php.viewSimpleListPath}\\head.js`)
const simpleListHeader = require(`${php.viewSimpleListPath}\\header.js`)

// CONFIG
const config = require(`${php.configPath}\\config.js`)

// PUBLIC
const index = require(`${php.publicPath}\\index.js`)

const indexJS = require(`${php.publicJSPath}\\index.js`)
const apiJS = require(`${php.publicJSPath}\\api.js`)

const homeJS = require(`${php.publicJSViewPath}\\home.js`)
const _404JS = require(`${php.publicJSViewPath}\\404.js`)
const addEditFormJS = require(`${php.publicJSViewPath}\\addEditForm.js`)
const addFormJS = require(`${php.publicJSViewPath}\\addForm.js`)
const listWithAddJS = require(`${php.publicJSViewPath}\\listWithAdd.js`)
const listWithAddEditJS = require(`${php.publicJSViewPath}\\listWithAddEdit.js`)
const listWithAddEditRemoveJS = require(`${php.publicJSViewPath}\\listWithAddEditRemove.js`)
const listWithAddRemoveJS = require(`${php.publicJSViewPath}\\listWithAddRemove.js`)
const listWithEditJS = require(`${php.publicJSViewPath}\\listWithEdit.js`)
const listWithEditRemoveJS = require(`${php.publicJSViewPath}\\listWithEditRemove.js`)
const listWithRemoveJS = require(`${php.publicJSViewPath}\\listWithRemove.js`)
const simpleJS = require(`${php.publicJSViewPath}\\simple.js`)
const simpleListJS = require(`${php.publicJSViewPath}\\simpleList.js`)

// SOURCE
const composer = require(`${php.sourcePath}\\composer.js`)

const Breadcrumb = require(`${php.sourceClassesPath}\\Breadcrumb.js`)
const Render = require(`${php.sourceClassesPath}\\Render.js`)
const Routes = require(`${php.sourceClassesPath}\\Routes.js`)

const iView = require(`${php.sourceInterfacesPath}\\iView.js`)

const UrlParser = require(`${php.sourceTraitsPath}\\UrlParser.js`)
const UrlParserPHP5_3 = require(`${php.sourceTraitsPath}\\UrlParserPHP5_3.js`)

/* GET zipped PHP website base files. */
router.get('/show/php', function(req, res, next) {
	try {
		const filesAndDates = []
		const files = utils.getZipsFromIP(utils.getClientAddress(req), 1)
		files.forEach((file) => {
			var stats = fs.statSync(`${php.phpZipPath}\\${file}`);
			var mtime = stats.mtime;

			filesAndDates.push(mtime.getTime());
		})
		res.json({
			"ok": true,
			"content": {
				"files": filesAndDates
			}
		})
	} catch(ex) {
		res.status(500).send({ error: ex.message });
	}
});

/* DELETE zipped PHP website base file. */
router.delete('/delete/php/:time', function(req, res, next) {
	try {
		const time = req.params.time;

		fs.unlinkSync(`${php.phpZipPath}\\${utils.getZipFromTime(utils.getClientAddress(req), time, 1)}`);

		res.json({
			"ok": true,
			"content": "Arquivo deletado!"
		})
	} catch(ex) {
		res.status(500).send({ error: ex.message });
	}
});

/* GET zipped PHP website base file. */
router.get('/download/php/:time', function(req, res, next) {
	try {
		const time = req.params.time;
		const myIP = utils.getClientAddress(req);

		const zipBuffer = fs.readFileSync(`${php.phpZipPath}\\${utils.getZipFromTime(myIP, time, 1)}`)
		
		const myFilesLength = utils.getZipsFromIP(myIP, 1).length;
	
		const base64data = zipBuffer.toString('base64')

		res.json({
			"ok": true,
			"content": {
				"zippedFilesLeft": 3 - myFilesLength,
				"zipTime": time,
				"zipBase64": base64data
			}
		})
	} catch(ex) {
		res.status(500).send({ error: ex.message });
	}
});

/* POST generate zipped PHP website base files. */
router.post('/zip/php', jsonParser, function(req, res, next) {
	try {
		const myIP = utils.getClientAddress(req)
		let myFilesLength = utils.getZipsFromIP(myIP, 1).length;

		if (myFilesLength < 3) {
			const htaccessText = htaccess.getText()
			const WebConfigText = WebConfig.getText()

			// APP
			const DispatchText = Dispatch.getText()
			const appHtaccessText = appHtaccess.getText()
			const appWebConfigText = appWebConfig.getText()

			// CONTROLLER
			const Controller404Text = Controller404.getText(req.body.keywords404)
			const ControllerAPIText = ControllerAPI.getText(req.body.models)
			const ControllerHomeText = ControllerHome.getText(req.body.title, req.body.description, req.body.keywords)
			const ControllerPagesTexts = []
			req.body.pages.forEach((page) => {
				ControllerPagesTexts.push({
					"name": page.name,
					"text": ControllerPage.getText(page)
				})
			})
			const eControllerText = eController.getText()

			// DATA
			const DAOText = DAO.getText(req.body.database)

			// MODEL
			const iModelText = iModel.getText()

			const eModelText = eModel.getText()
			const eModelListText = eModelList.getText()
			const eSuperText = eSuper.getText()
			const JsonSerializableText = JsonSerializable.getText()

			let hasList = false
			const ModelTexts = []
			const ModelsTexts = []
			req.body.models.forEach((model) => {
				ModelTexts.push({
					"name": model.name,
					"text": Model.getText(model)
				})
				if (model.hasList) {
					ModelsTexts.push({
						"name": model.name,
						"text": Models.getText(model)
					})
					if (!hasList) {
						hasList = true
					}
				}
			})

			// VIEW
			const footerText = footer.getText(req.body.author)

			const insertEditListTypeIds = [5, 6, 8, 9, 10, 11]
			const hasModal = req.body.pages.find(obj => insertEditListTypeIds.includes(obj.type.id))
			
			const mainText = main.getText(req.body.author, req.body.framework, hasList, hasModal)
			const topbarText = topbar.getText()

			const indexJSText = indexJS.getText(req.body.loadingText, req.body.loadingTextClass, req.body.loadingClass, req.body.loadingModalClass, req.body.contentClass, req.body.contentModalClass)
			const apiJSText = apiJS.getText(req.body.models)

			const _404JSText = _404JS.getText()
			const _404ContentText = _404Content.getText()
			const _404FooterText = _404Footer.getText()
			const _404HeadText = _404Head.getText()
			const _404HeaderText = _404Header.getText()

			const homeJSText = homeJS.getText()
			const homeContentText = homeContent.getText()
			const homeFooterText = homeFooter.getText()
			const homeHeadText = homeHead.getText()
			const homeHeaderText = homeHeader.getText()

			const pages = []
			req.body.pages.forEach((page) => {
				if (page.type.id == 1) {
					pages.push({
						"name": page.name,
						"model": null,
						"modal": null,
						"type": page.type.id,
						"js": simpleJS.getText(),
						"content": simpleContent.getText(),
						"footer": simpleFooter.getText(),
						"head": simpleHead.getText(),
						"header": simpleHeader.getText(page),
					})
				} else if (page.type.id == 2) {
					pages.push({
						"name": page.name,
						"model": null,
						"modal": null,
						"type": page.type.id,
						"js": addFormJS.getText(page),
						"content": addFormContent.getText(page),
						"footer": addFormFooter.getText(),
						"head": addFormHead.getText(page),
						"header": addFormHeader.getText(page),
					})
				} else if (page.type.id == 3) {
					pages.push({
						"name": page.name,
						"model": null,
						"modal": null,
						"type": page.type.id,
						"js": addEditFormJS.getText(page),
						"content": addEditFormContent.getText(page),
						"footer": addEditFormFooter.getText(),
						"head": addEditFormHead.getText(page),
						"header": addEditFormHeader.getText(page),
					})
				} else if (page.type.id == 4) {
					pages.push({
						"name": page.name,
						"model": null,
						"modal": null,
						"type": page.type.id,
						"js": simpleListJS.getText(),
						"content": simpleListContent.getText(),
						"footer": simpleListFooter.getText(),
						"head": simpleListHead.getText(),
						"header": simpleListHeader.getText(page),
					})
				} else if (page.type.id == 5) {		
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithAddModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithAddJS.getText(page),
						"content": listWithAddContent.getText(page),
						"footer": listWithAddFooter.getText(),
						"head": listWithAddHead.getText(page),
						"header": listWithAddHeader.getText(page),
					})
				} else if (page.type.id == 6) {
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithEditModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithEditJS.getText(page),
						"content": listWithEditContent.getText(page),
						"footer": listWithEditFooter.getText(),
						"head": listWithEditHead.getText(page),
						"header": listWithEditHeader.getText(page),
					})
				} else if (page.type.id == 7) {
					pages.push({
						"name": page.name,
						"model": null,
						"modal": null,
						"type": page.type.id,
						"js": listWithRemoveJS.getText(page),
						"content": listWithRemoveContent.getText(page),
						"footer": listWithRemoveFooter.getText(),
						"head": listWithRemoveHead.getText(page),
						"header": listWithRemoveHeader.getText(page),
					})
				} else if (page.type.id == 8) {
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithAddEditModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithAddEditJS.getText(page),
						"content": listWithAddEditContent.getText(page),
						"footer": listWithAddEditFooter.getText(),
						"head": listWithAddEditHead.getText(page),
						"header": listWithAddEditHeader.getText(page),
					})
				} else if (page.type.id == 9) {
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithEditRemoveModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithEditRemoveJS.getText(page),
						"content": listWithEditRemoveContent.getText(page),
						"footer": listWithEditRemoveFooter.getText(),
						"head": listWithEditRemoveHead.getText(page),
						"header": listWithEditRemoveHeader.getText(page),
					})
				} else if (page.type.id == 10) {
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithAddRemoveModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithAddRemoveJS.getText(page),
						"content": listWithAddRemoveContent.getText(page),
						"footer": listWithAddRemoveFooter.getText(),
						"head": listWithAddRemoveHead.getText(page),
						"header": listWithAddRemoveHeader.getText(page),
					})
				} else if (page.type.id == 11) {
					pages.push({
						"name": page.name,
						"model": page.item.name.replaceAt(0, page.item.name.charAt(0).toLowerCase()),
						"modal": listWithAddEditRemoveModalsContent.getText(page),
						"type": page.type.id,
						"js": listWithAddEditRemoveJS.getText(page),
						"content": listWithAddEditRemoveContent.getText(page),
						"footer": listWithAddEditRemoveFooter.getText(),
						"head": listWithAddEditRemoveHead.getText(page),
						"header": listWithAddEditRemoveHeader.getText(page),
					})
				}
			})

			// CONFIG
			const configText = config.getText()

			// PUBLIC
			const indexText = index.getText()

			// SOURCE
			const composerText = composer.getText(req.body.author, req.body.email)

			const BreadcrumbText = Breadcrumb.getText()
			const RenderText = Render.getText(req.body.pages)
			const RoutesText = Routes.getText(req.body.pages)

			const iViewText = iView.getText()

			const UrlParserText = UrlParser.getText()
			const UrlParserPHP5_3Text = UrlParserPHP5_3.getText()
	
			const zip = new AdmZip();
			
			// add file directly
			zip.addFile(".htaccess", Buffer.from(htaccessText));
			zip.addFile("Web.Config", Buffer.from(WebConfigText));

			zip.addFile("app\\Dispatch.php", Buffer.from(DispatchText));
			zip.addFile("app\\.htaccess", Buffer.from(appHtaccessText));
			zip.addFile("app\\Web.Config", Buffer.from(appWebConfigText));
			
			zip.addFile("app\\controller\\Controller404.php", Buffer.from(Controller404Text));
			zip.addFile("app\\controller\\ControllerAPI.php", Buffer.from(ControllerAPIText));
			zip.addFile("app\\controller\\ControllerHome.php", Buffer.from(ControllerHomeText));
			zip.addFile("app\\controller\\eController.php", Buffer.from(eControllerText));
			ControllerPagesTexts.forEach((ControllerPageText) => {
				zip.addFile(`app\\controller\\Controller${ControllerPageText.name.replaceAll("-", "_").capitaliseFirstLetter()}.php`, Buffer.from(ControllerPageText.text));
			})

			zip.addFile("app\\data\\DAO.php", Buffer.from(DAOText));

			zip.addFile("app\\model\\_Interface\\iModel.php", Buffer.from(iModelText));
			zip.addFile("app\\model\\SuperClass\\eModel.php", Buffer.from(eModelText));
			zip.addFile("app\\model\\SuperClass\\eModelList.php", Buffer.from(eModelListText));
			zip.addFile("app\\model\\SuperClass\\eSuper.php", Buffer.from(eSuperText));
			zip.addFile("app\\model\\SuperClass\\JsonSerializable.php", Buffer.from(JsonSerializableText));
			
			ModelTexts.forEach((model) => {
				zip.addFile(`app\\model\\${model.name.replaceAll("-", "_").capitaliseFirstLetter()}.php`, Buffer.from(model.text));
			})
			ModelsTexts.forEach((models) => {
				zip.addFile(`app\\model\\${models.name.replaceAll("-", "_").capitaliseFirstLetter()}s.php`, Buffer.from(models.text));
			})

			zip.addFile("app\\view\\footer.php", Buffer.from(footerText));
			zip.addFile("app\\view\\main.php", Buffer.from(mainText));
			zip.addFile("app\\view\\topbar.php", Buffer.from(topbarText));

			zip.addFile("public\\js\\api.js", Buffer.from(apiJSText));
			zip.addFile("public\\js\\index.js", Buffer.from(indexJSText));
			
			zip.addFile("public\\js\\view\\404.js", Buffer.from(_404JSText));
			zip.addFile("app\\view\\404\\content.php", Buffer.from(_404ContentText));
			zip.addFile("app\\view\\404\\footer.php", Buffer.from(_404FooterText));
			zip.addFile("app\\view\\404\\head.php", Buffer.from(_404HeadText));
			zip.addFile("app\\view\\404\\header.php", Buffer.from(_404HeaderText));

			zip.addFile("public\\js\\view\\home.js", Buffer.from(homeJSText));
			zip.addFile("app\\view\\home\\content.php", Buffer.from(homeContentText));
			zip.addFile("app\\view\\home\\footer.php", Buffer.from(homeFooterText));
			zip.addFile("app\\view\\home\\head.php", Buffer.from(homeHeadText));
			zip.addFile("app\\view\\home\\header.php", Buffer.from(homeHeaderText));
			
			pages.forEach((page) => {
				zip.addFile(`public\\js\\view\\${page.name.replaceAll("-", "_").capitaliseFirstLetter()}.js`, Buffer.from(page.js));
				zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\content.php`, Buffer.from(page.content));
				zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\footer.php`, Buffer.from(page.footer));
				zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\head.php`, Buffer.from(page.head));
				zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\header.php`, Buffer.from(page.header));
				if (page.type == 5) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\add_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				} else if (page.type == 6) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\edit_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				} else if (page.type == 8) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\addEdit_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				} else if (page.type == 9) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\edit_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				} else if (page.type == 10) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\add_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				} else if (page.type == 11) {
					zip.addFile(`app\\view\\${page.name.capitaliseFirstLetter()}\\modals\\addEdit_${page.model.replaceAll("-", "_")}_modal.php`, Buffer.from(page.modal));
				}
			})

			zip.addFile("config\\config.php", Buffer.from(configText));
			
			zip.addFile("public\\index.php", Buffer.from(indexText));

			zip.addLocalFile(`${php.publicJSPath}\\bootstrap-multiselect.min.js`, "public\\js");
			zip.addLocalFile(`${php.publicJSPath}\\notiflix-aio-2.7.0.min.js`, "public\\js");
			zip.addLocalFile(`${php.publicJSPath}\\commons.js`, "public\\js");

			zip.addLocalFile(`${php.publicCSSPath}\\bootstrap-multiselect.min.css`, "public\\css")
			zip.addLocalFile(`${php.publicCSSPath}\\notiflix-2.7.0.min.css`, "public\\css")
			zip.addLocalFile(`${php.publicCSSPath}\\custom.css`, "public\\css")

			zip.addFile("src\\composer.json", Buffer.from(composerText));
			
			zip.addFile("src\\classes\\Breadcrumb.php", Buffer.from(BreadcrumbText));
			zip.addFile("src\\classes\\Render.php", Buffer.from(RenderText));
			zip.addFile("src\\classes\\Routes.php", Buffer.from(RoutesText));
			
			zip.addFile("src\\interfaces\\iView.php", Buffer.from(iViewText));
			
			zip.addFile("src\\traits\\UrlParser.php", Buffer.from(UrlParserText));
			zip.addFile("src\\traits\\UrlParserPHP5_3.php", Buffer.from(UrlParserPHP5_3Text));
	
			// get everything as a buffer
			const zipBuffer = zip.toBuffer();
	
			// or write everything to disk
			const zipSourceFileName = `${myIP}-${utils.generateUid()}.zip`
			zip.writeZip(`${php.phpZipPath}\\${zipSourceFileName}`); //target file name
	
			var stats = fs.statSync(`${php.phpZipPath}\\${zipSourceFileName}`);
			var mtime = stats.mtime;
	
			let base64data = zipBuffer.toString('base64')

			myFilesLength = utils.getZipsFromIP(myIP, 1).length;
	
			res.json({
				"ok": true,
				"content": {
					"zippedFilesLeft": 3 - myFilesLength,
					"zipTime": mtime.getTime(),
					"zipBase64": base64data
				}
			})
		} else {
			res.json({
				"ok": false,
				"content": "Você não pode mais gerar outro zip base de PHP, delete um se quiser gerar outro."
			})
		}
	} catch(ex) {
		res.json({
			"ok": false,
			"content": ex.message
		})
	}
});

module.exports = router;