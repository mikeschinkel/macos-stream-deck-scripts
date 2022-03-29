function alert(text) {
    var curApp = Application.currentApplication()
    curApp.includeStandardAdditions = true
    curApp.displayDialog(text)
}
var ACTIVATE=true
function quicktime(activate) {
    if ( typeof quicktime.app == 'undefined' ) {
        const fiveSeconds = {by:5*15} // 15 ticks = 1 second
        quicktime.filePath = "/System/Applications/QuickTime Player.app"
        quicktime.app = Application(quicktime.filePath)
        quicktime.includeStandardAdditions = true
        quicktime.isFrontMost = function() {
            return frontMost().posixPath() === quicktime.filePath
        }
        quicktime.activate = function() {
            return quicktime.app.activate()
        }
        quicktime.firstDoc = function() {
            return quicktime.app.documents[0]
        }
        quicktime.ahead5 = function() {
            quicktime.firstDoc().stepForward(fiveSeconds)
        }
        quicktime.back5 = function() {
            quicktime.firstDoc().stepBackward(fiveSeconds)
        }
    }
    if ( typeof activate !== 'undefined' && ! quicktime.isFrontMost() ) {
        quicktime.activate()
    }
    return quicktime
}
function systemEvents(){
    if ( typeof systemEvents.app == 'undefined' ) {
        systemEvents.app = Application("System Events")
        systemEvents.frontMost = function() {
            return systemEvents.app.processes.whose({frontmost: true})[0]
        }
    }
    return systemEvents
}
function frontMost() {
    if ( typeof frontMost.current == 'undefined' ) {
        frontMost.current = function() {
            return systemEvents().frontMost()
        }
        frontMost.name = function() {
            return frontMost.current().name()
        }
        frontMost.displayedName = function() {
            return frontMost.current().displayedName()
        }
        frontMost.applicationFile = function() {
            return frontMost.current().applicationFile()
        }
        frontMost.posixPath = function() {
            return frontMost.applicationFile().posixPath()
        }
    }
    return frontMost
}

// function toClipboard(text){
//     var frontMost = Application(frontAppName())
//     frontMost.includeStandardAdditions = true
//     frontMost.setTheClipboardTo(frontMost.documents()[0].path())
// }
