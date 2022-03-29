#!/bin/sh
osascript -l JavaScript <<'END'
	var app = Application("/Applications/Setapp/Movist Pro.app")
	app.activate()
END