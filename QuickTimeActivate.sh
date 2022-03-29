#!/bin/sh
osascript -l JavaScript <<'END'
  eval(Library("Utils").load("Functions.js"))

	const path = "/System/Applications/QuickTime Player.app"
	const app = Application(path)
  app.includeStandardAdditions = true
	if ( ! app.frontmost ) {
		app.activate()
	}
END