function alert(text) {
    var curApp = Application.currentApplication()
    curApp.includeStandardAdditions = true
    curApp.displayDialog(text)
}
// Cannot use `let` or `const` to define ACTIVATE as it will
// not be visible when eval()ed by loader, for some reason.
var ACTIVATE=true
function quicktime(activate) {
    if ( typeof quicktime.app == 'undefined' ) {
        const TickPerSecond = 15 // 15 ticks = 1 second
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
        quicktime.play = function() {
            quicktime.firstDoc().play()
        }
        quicktime.stop = function() {
            quicktime.firstDoc().stop()
        }
        quicktime.togglePlaying = function() {
            if (quicktime.isPlaying()) {
                quicktime.stop()
            } else {
                quicktime.play()
            }
        }
        quicktime.ahead = function(seconds) {
            const playing = quicktime.isPlaying()
            quicktime.firstDoc().stepForward({by:seconds*TickPerSecond})
            if (playing) {
                quicktime.play()
            }
        }
        quicktime.back = function(seconds) {
            const playing = quicktime.isPlaying()
            quicktime.firstDoc().stepBackward({by:seconds*TickPerSecond})
            if (playing) {
                quicktime.play()
            }
        }
        quicktime.isPlaying = function() {
            return quicktime.firstDoc().playing()
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
