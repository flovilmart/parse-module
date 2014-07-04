var PPM = require("./PPM.js"),
	 pkg = require('../package.json')

program.version(pkg.version)
program.command('install [repository] [targetname]')
	.action(function(repo, targetName){
		console.log(repo);
		console.log(targetName)
		var ppm = new PPM();
		ppm.install(repo, targetName);
	})
	
program.parse(process.argv)

/*var ppm = new PPM();
ppm.initialize();
var module_name = 'twitter';
ppm.install('flovilmart/parse-twitter', module_name, function(){
	console.log('Installed '+module_name);
});*/

/*install('flovilmart/parse-cli', 'parse-cli',  function(err){
	console.log(err);
});*/