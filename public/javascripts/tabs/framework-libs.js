import getLanguage from '/javascripts/views/language-chooser.js';

const tblFrameworksBodyTableId = "frameworks-libs-body-table";
const tblLibsBodyTableId = "libs-body-table";
const txtLibsCodeId="libs-code"
const txtLibsVersionsCodeId="libs-versions-code"
const frmFrameworksId = "frameworks-form"
const radFrameworksName = "frameworks"

const chkUIComponentsId="uicomponents"
const chkMaterialDesignForAndroidId="material-design-for-android"
const chkCoroutinesId="coroutines"
const chkLifecycleId="lifecycle"
const chkFirebaseCoreId="firebasecore"
const chkFirebaseStorageId="firebasestorage"
const chkFirebaseFirestoreId="firebasefirestore"
const chkFirebaseAuthId="firebaseauth"
const chkFirebaseMessagingId="firebasemessaging"
const chkAvatarGeneratorId="avatargenerator"
const chkCardviewId="cardview"
const chkFloatingSearchViewId="floatingsearchview"
const chkRecyclerViewId="recyclerview"
const chkSpeedDialId="speeddial"
const chkRetrofitId="retrofit"
const chkLottieId="lottie"

const lib1 = 'implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$versions.kotlin"'
const lib1Version = 'kotlin: ""'
const lib2 = 'implementation "androidx.appcompat:appcompat:$versions.appcompat"'
const lib2Version = 'appcompat: ""'
const lib3 = 'implementation "androidx.constraintlayout:constraintlayout:$versions.constraintlayout"'
const lib3Version = 'constraintlayout: ""'
const libLifecycle = 'implementation "androidx.lifecycle:lifecycle-extensions:$versions.lifecycle"'
const libLifecycleVersion = 'lifecycle: ""'
const libCardview = 'implementation "androidx.cardview:cardview:$versions.cardview"'
const libCardviewVersion = 'cardview: ""'
const libRecyclerView = 'implementation "androidx.recyclerview:recyclerview:$versions.recyclerview"'
const libRecyclerViewVersion = 'recyclerview: ""'

const libUIComponents = 'implementation "com.niemietz:uicomponents:$versions.uicomponents"'
const libUIComponentsVersion = 'uicomponents: ""'
const libMaterialDesign = 'implementation "com.google.android.material:material:$versions.materialDesign"'
const libMaterialDesignVersion = 'materialDesign: ""'
const libLottie = 'implementation "com.airbnb.android:lottie:$versions.lottie"'
const libLottieVersion = 'lottie: ""'

const libFirebaseCore = 'implementation "com.google.firebase:firebase-core:$versions.firebaseCore"'
const libFirebaseCoreVersion = 'firebaseCore: ""'
const libFirebaseStorage = 'implementation "com.google.firebase:firebase-storage:$versions.firebaseStorage"'
const libFirebaseStorageVersion = 'firebaseStorage: ""'
const libFirebaseFirestore = 'implementation "com.google.firebase:firebase-firestore:$versions.firebaseFirestore"'
const libFirebaseFirestoreVersion = 'firebaseFirestore: ""'
const libFirebaseAuth = 'implementation "com.google.firebase:firebase-auth:$versions.firebaseAuth"'
const libFirebaseAuthVersion = 'firebaseAuth: ""'
const libFirebaseMessaging = 'implementation "com.google.firebase:firebase-messaging:$versions.firebaseMessaging"'
const libFirebaseMessagingVersion = 'firebaseMessaging: ""'

const lib4 = 'implementation "com.squareup.okhttp3:okhttp:$versions.okhttp"'
const lib4Version = 'okhttp: ""'
const libRetrofit = `implementation "com.squareup.retrofit2:retrofit:$versions.retrofit2"
implementation "com.squareup.retrofit2:converter-gson:$versions.retrofit2"`
const libRetrofitVersion = 'retrofit2: ""'
const libCoroutines = `implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:$versions.coroutines"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$versions.coroutines"`
const libCoroutinesVersion = 'coroutines: ""'

const libFloatingSearchView = 'implementation "com.github.arimorty:floatingsearchview:$versions.floatingsearchview"'
const libFloatingSearchViewVersion = 'floatingsearchview: ""'
const libSpeedDial = 'implementation "com.leinardi.android:speed-dial:$versions.speeddial"'
const libSpeedDialVersion = 'speeddial: ""'
const libAvatarGenerator = 'implementation "com.first.avatargenerator:AvatarImageGenerator:$versions.avatargenerator"'
const libAvatarGeneratorVersion = 'avatargenerator: ""'

const lib5 = 'implementation "com.google.code.gson:gson:$versions.gson"'
const lib5Version = 'gson: ""'
const lib6 = 'implementation "androidx.core:core-ktx:$versions.coreKtx"'
const lib6Version = 'coreKtx: ""'

const lib7 = 'testImplementation "junit:junit:$versions.junitTest"'
const lib7Version = 'junitTest: ""'

const lib8 = 'androidTestImplementation "androidx.test.ext:junit:$versions.junitAndroidTest"'
const lib8Version = 'junitAndroidTest: ""'
const lib9 = 'androidTestImplementation "androidx.test.espresso:espresso-core:$versions.espressoCore"'
const lib9Version = 'espressoCore: ""'

const libsAndroid = [
    { "component": lib1, "version": lib1Version, "use": true },
    { "component": lib2, "version": lib2Version, "use": true },
    { "component": lib3, "version": lib3Version, "use": true },
    { "component": libLifecycle, "version": libLifecycleVersion, "use": true },
    { "component": libCardview, "version": libCardviewVersion, "use": true },
    { "component": libRecyclerView, "version": libRecyclerViewVersion, "use": true }
]

const libsDesignSystem = [
    { "component": libUIComponents, "version": libUIComponentsVersion, "use": true },
    { "component": libMaterialDesign, "version": libMaterialDesignVersion, "use": true },
    { "component": libLottie, "version": libLottieVersion, "use": true }
]

const libsGoogleFirebase = [
    { "component": libFirebaseCore, "version": libFirebaseCoreVersion, "use": true },
    { "component": libFirebaseStorage, "version": libFirebaseStorageVersion, "use": true },
    { "component": libFirebaseFirestore, "version": libFirebaseFirestoreVersion, "use": true },
    { "component": libFirebaseAuth, "version": libFirebaseAuthVersion, "use": true },
    { "component": libFirebaseMessaging, "version": libFirebaseMessagingVersion, "use": true }
]

const libsAPIRequest = [
    { "component": lib4, "version": lib4Version, "use": true },
    { "component": libRetrofit, "version": libRetrofitVersion, "use": true },
    { "component": libCoroutines, "version": libCoroutinesVersion, "use": true }
]

const libsExternalLibs = [
    { "component": libFloatingSearchView, "version": libFloatingSearchViewVersion, "use": true },
    { "component": libSpeedDial, "version": libSpeedDialVersion, "use": true },
    { "component": libAvatarGenerator, "version": libAvatarGeneratorVersion, "use": true }
]

const libsOthers = [
    { "component": lib5, "version": lib5Version, "use": true },
    { "component": lib6, "version": lib6Version, "use": true }
]

const libsTest = [
    { "component": lib7, "version": lib7Version, "use": true }
]

const libsAndroidTest = [
    { "component": lib8, "version": lib8Version, "use": true },
    { "component": lib9, "version": lib9Version, "use": true }
]

function getCodeText() {
    let code = ""
    let allUseFalse = true;
    libsAndroid.forEach((lib, index) => {
        if (index == 0) {
            code = "// Android"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = ""
    }
    allUseFalse = true;
    libsDesignSystem.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// Design System"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -18)
    }
    allUseFalse = true;
    libsGoogleFirebase.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// Google / Firebase"
        }
        if (lib.use) {
            allUseFalse = false


            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -22)
    }
    allUseFalse = true;
    libsAPIRequest.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// API Request"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -16)
    }
    allUseFalse = true;
    libsExternalLibs.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// External Libs"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -18)
    }
    allUseFalse = true;
    libsOthers.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// Others"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -11)
    }
    allUseFalse = true;
    libsTest.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// Test"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -9)
    }
    allUseFalse = true;
    libsAndroidTest.forEach((lib, index) => {
        if (index == 0) {
            code += "\n\n// Android Test"
        }
        if (lib.use) {
            allUseFalse = false

            code += `\n${lib.component}`
        }
    })
    if (allUseFalse) {
        code = code.slice(0, -17)
    }

    return code
}

function getGradlewDepenciesText() {
    let gradlewDepenciesText = ""
    libsAndroid.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText = "ext {\n    versions = [\n        // Android\n        gradle: '',"
        }
        if (lib.use) {
            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    let allUseFalse = true;
    libsDesignSystem.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += "\n\n        // Design System"
        }
        if (lib.use) {
            allUseFalse = false

            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    if (allUseFalse) {
        gradlewDepenciesText = gradlewDepenciesText.slice(0, -26)
    }
    libsGoogleFirebase.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += '\n\n        // Google / Firebase\n        googleServices: "",'
        }
        if (lib.use) {
            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    allUseFalse = true;
    libsAPIRequest.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += '\n\n        // API Request'
        }
        if (lib.use) {
            allUseFalse = false

            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    if (allUseFalse) {
        gradlewDepenciesText = gradlewDepenciesText.slice(0, -24)
    }
    allUseFalse = true;
    libsExternalLibs.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += "\n\n        // External Libs"
        }
        if (lib.use) {
            allUseFalse = false

            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    if (allUseFalse) {
        gradlewDepenciesText = gradlewDepenciesText.slice(0, -26)
    }
    libsOthers.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += '\n\n        // Others'
        }
        if (lib.use) {
            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    libsTest.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += '\n\n        // Test'
        }
        if (lib.use) {
            gradlewDepenciesText += `\n        ${lib.version},`
        }
    })
    libsAndroidTest.forEach((lib, index) => {
        if (index == 0) {
            gradlewDepenciesText += '\n\n        // Android Test'
        }
        if (lib.use) {
            if (index > 0) {
                gradlewDepenciesText += ","
            }
            gradlewDepenciesText += `\n        ${lib.version}`
        }
    })
    gradlewDepenciesText += "\n    ]\n"
    gradlewDepenciesText += "}"

    return gradlewDepenciesText
}

const framework = { "id": 1, "framework": "Bootstrap" }

$(document).ready(function()
{
    document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
    document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()

    const frameworksBodyTable = $(`#${tblFrameworksBodyTableId}`);
    const libsBodyTable = $(`#${tblLibsBodyTableId}`);

    document.getElementsByName(radFrameworksName).forEach((radFramework) => {
        radFramework.onclick = function (ev) {
            const selectedFrameworkLabel = this.parentNode.querySelector("label")
            framework.id = parseInt(this.value)
            framework.framework = selectedFrameworkLabel.innerHTML
        }
    })

    // Android

    document.getElementById(chkLifecycleId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsAndroid.find(obj => obj.component == libLifecycle)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsAndroid.find(obj => obj.component == libLifecycle)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkCardviewId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsAndroid.find(obj => obj.component == libCardview)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsAndroid.find(obj => obj.component == libCardview)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkRecyclerViewId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsAndroid.find(obj => obj.component == libRecyclerView)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsAndroid.find(obj => obj.component == libRecyclerView)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    // Design System

    document.getElementById(chkUIComponentsId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsDesignSystem.find(obj => obj.component == libUIComponents)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsDesignSystem.find(obj => obj.component == libUIComponents)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }

    document.getElementById(chkMaterialDesignForAndroidId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsDesignSystem.find(obj => obj.component == libMaterialDesign)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsDesignSystem.find(obj => obj.component == libMaterialDesign)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }

    document.getElementById(chkLottieId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsDesignSystem.find(obj => obj.component == libLottie)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsDesignSystem.find(obj => obj.component == libLottie)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }

    // Google / Firebase

    document.getElementById(chkFirebaseCoreId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseCore)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseCore)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkFirebaseStorageId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseStorage)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseStorage)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkFirebaseFirestoreId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseFirestore)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseFirestore)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkFirebaseAuthId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseAuth)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseAuth)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkFirebaseMessagingId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseMessaging)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsGoogleFirebase.find(obj => obj.component == libFirebaseMessaging)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }

    // API Request

    document.getElementById(chkRetrofitId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsAPIRequest.find(obj => obj.component == libRetrofit)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsAPIRequest.find(obj => obj.component == libRetrofit)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkCoroutinesId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsAPIRequest.find(obj => obj.component == libCoroutines)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsAPIRequest.find(obj => obj.component == libCoroutines)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }

    // External Libs

    document.getElementById(chkFloatingSearchViewId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsExternalLibs.find(obj => obj.component == libFloatingSearchView)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsExternalLibs.find(obj => obj.component == libFloatingSearchView)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkSpeedDialId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsExternalLibs.find(obj => obj.component == libSpeedDial)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsExternalLibs.find(obj => obj.component == libSpeedDial)
            obj.use = false
        }
        
        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
    
    document.getElementById(chkAvatarGeneratorId).onchange = function(e) {
        if(this.checked) {
            this.value = "1"
            let obj = libsExternalLibs.find(obj => obj.component == libAvatarGenerator)
            obj.use = true
        } else {
            this.value = "0"
            let obj = libsExternalLibs.find(obj => obj.component == libAvatarGenerator)
            obj.use = false
        }

        document.getElementById(txtLibsCodeId).innerHTML = getCodeText()
        document.getElementById(txtLibsVersionsCodeId).innerHTML = getGradlewDepenciesText()
    }
});

export default function() {
    return framework;
}