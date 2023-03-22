const { ipcRenderer, webContents } = require("electron");



document.addEventListener('DOMContentLoaded',e=>{
	console.log("hi");
	document.getElementById('message').innerHTML = "Salut"
	ipcRenderer.on('update', (e, message)=>{
		console.log(message);
	})
})

