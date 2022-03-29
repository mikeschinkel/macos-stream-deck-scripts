#!/bin/sh
osascript -l JavaScript <<'END'
  eval(Library("Utils").load("Functions.js"))
	quicktime(ACTIVATE).back5()
END
