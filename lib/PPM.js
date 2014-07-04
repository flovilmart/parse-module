var Installer = require("./Installer.js"),
	 pkg = require('../package.json'),
	 program = require("commander")

program.version(pkg.version)
program.command('install [repository] [targetname]')
	.action(function(repo, targetName){
		var installer = new Installer();
		installer.install(repo, targetName, function(err){
			if (err) {
				console.error(err);
			};
		});
	})
	
program.parse(process.argv)
