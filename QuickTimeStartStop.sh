#!/bin/sh
osascript -l JavaScript <<'EOD'
  eval(Library("Utils").load("Functions.js"))
  quicktime(ACTIVATE).togglePlaying()
EOD