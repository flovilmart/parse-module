parse-module
============

Parse module manager based of git

It's a simple module manager based on git that will fetch and place in your cloud/parse_modules folder the corresponding repository

That really helps with writing and sharing modules for the parse platform.

Used with [parse-require](https://github.com/flovilmart/parse-require), you will be able to have a more readable and portable code!

##Installation

	npm install -g parse-module
	
## Install a module

Go to your parse app folder

	parse-module install [Repository] [Folder]
	
	
Repository:
	a valid repository (http://github.com/flovilmart/parse-require)

- Github repositories can be shorter with `flovilmart/parse-require`
- You can pass a tag, version nubmer through the # `flovilmart/parse-require#master`


Folder:
	The target folder where to install the module (beware of conflicts!)
	

Example:

	`parse-module install flovilmart/parse-require require`
	
This command will download the github **flovilmart/parse-require** repository's master and place the content to **cloud/parse_modules/require**

