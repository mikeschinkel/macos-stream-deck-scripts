JsOsaDAS1.001.00bplist00�Vscript_�function load(file) {
	var app = Application.currentApplication()
	app.includeStandardAdditions = true
    return app.read(Path(".").toString()+"/Libraries/"+file)
}
                            �jscr  ��ޭ