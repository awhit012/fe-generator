var fs = require('fs');
var exec = require('child_process').exec;

const projectName = process.argv[process.argv.length -1] 
const homedir = require('os').homedir();
const rootPath = `${homedir}/Desktop/projects/`
const title = projectName.replace("-", " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
const projectLocation = rootPath + projectName

const HTMLTemplate = 
`<!DOCTYPE html>
<html>
<head>
	<title>${title}</title>
	<link rel="stylesheet" type="text/css" href="/css/style.css">
</head>
<body>
	<script src="/js/app.js" type="text/javascript"></script>
</body>
</html>
`

const CSSTemplate = 
`body {
	font-family: Lobster
}
`

const JSTemplate = 
`
console.log("Welcome to FE Generator!!!")
`
const createStructure = () => {
	new Promise(function(resolve, reject) {
		resolve(exec(`mkdir ${projectLocation}`))
	}).then(()=> {
		fs.writeFileSync(`${projectLocation}/index.html`, HTMLTemplate)
	}).then(()=> {
		exec(`mkdir ${projectLocation}/js`)
		exec(`mkdir ${projectLocation}/css`)
		exec(`touch ${projectLocation}/css/style.css`)
	}).then(()=> {
		fs.writeFileSync(`${projectLocation}/css/style.css`, CSSTemplate)
		exec(`touch ${projectLocation}/js/app.js`)
		fs.writeFileSync(`${projectLocation}/js/app.js`, JSTemplate)
		console.log("project created")
		exec(`subl ${projectLocation}`);
	})
	
}


// const gitInit = () => {
// 	exec(`cd ${projectLocation} && git init && git add -A && git commit -m 'initial commit from fe-generator`)
// 	console.log("Git repo created!")
// }

createStructure()


