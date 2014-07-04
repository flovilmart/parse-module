var URL = require('url'),
	 request = require('request'),
	 tar = require('tar'),
	 unzip = require('unzip'),
	 util = require('util'),
	 glob = require('glob'),
	 fs = require('fs-extra'),
	 StringReader = require('./lib/StringReader'),
	 path = require('path')

var resolveModuleName = function(moduleName){
	var url = URL.parse(moduleName);
	if (!url.host || !url.hostname) {
		url.host = url.hostname = 'github.com';
	};
	console.log(url);
	if (!url.protocol || ['http:', 'https:'].indexOf(url.protocol) < 0) {
		url.protocol = 'https:';
	};
	console.log(url);
	return url;
}

var buildURL = function(url){
	return util.format("%s//%s", url.protocol, path.join(url.host, url.path, 'archive', url.hash+".zip"));
}

var PPM = function(){
	try{
		var config = require(process.cwd()+"/config/global.json");
	}catch(e){
		console.log(e);
		throw "Not in parse directory"
	}

	this.root = process.cwd();
	this.cloud_root = path.join(this.root, 'cloud');
	this.modules_root = path.join(this.cloud_root, 'parse_modules');
	this._initialized = false;
}

PPM.prototype.initialize = function(){
	if (!fs.existsSync(this.modules_root)) {
		fs.mkdir(this.modules_root);
	}
}

PPM.prototype.install = function(arg, module_name, callback){
	if (!this._initialized) {
		this.initialize();
	};
	var self = this;
	var url = resolveModuleName(arg);
	if (!url.hash) {
		url.hash = 'master';
	};



	if (!module_name) {
		module_name = url.path.split("/")[url.path.split("/").length-1];
	};
	var targetPath = path.join(self.modules_root, module_name);

	if (fs.existsSync(targetPath)) {
		console.log("Delete existing version...")
		fs.deleteSync(targetPath)
	};

	var firstDirectory;
		var requestURL = buildURL(url);
		console.log(requestURL);
	request(requestURL).pipe(unzip.Parse())
	.on('entry', function(entry){
	  	var fileName = entry.path;
	  	 var type = entry.type;
	  	 if(type === 'Directory'){
	  	 	if (!firstDirectory) {
	  	 		firstDirectory = fileName;
	  	 	}
	  	 	fs.mkdir(path.join(self.modules_root, fileName), function(){})
	  	 	 entry.autodrain();
	  	 }else{
	  	 	entry.pipe(fs.createWriteStream(path.join(self.modules_root, fileName)));
	  	 }
	  }).on('finish', function(a){
	  	console.log("Done downloading...");
	  	fs.move(path.join(self.modules_root, firstDirectory), targetPath, function(){
	  		callback();
	  	});
	  })
}




var ppm = new PPM();
ppm.initialize();
var module_name = 'twitter';
ppm.install('flovilmart/parse-twitter', module_name, function(){
	console.log('Installed '+module_name);
});

/*install('flovilmart/parse-cli', 'parse-cli',  function(err){
	console.log(err);
});*/