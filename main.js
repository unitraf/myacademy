const { app, BrowserWindow} = require('electron');

const checkForUpdates = require("./updater")
// const { autoUpdater, AppUpdater } = require('electron-updater');

// autoUpdater.autoDownload=false
// autoUpdater.autoInstallOnAppQuit=true

let mainWindow;
const path = require("path");
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload:path.join(__dirname,"src","index.js")
    },
  });
  mainWindow.loadURL( `file://${path.join(__dirname,"src", "index.html")}`)
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
 
  mainWindow.openDevTools();
}
// mainWindow.once('ready-to-show', () => {
// 	autoUpdater.checkForUpdatesAndNotify();
//   });

app.on('ready', () => {
  createWindow();
  
checkForUpdates
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function showMessage (message){
  console.log('====================================');
  console.log(message);
  console.log('====================================');
  mainWindow.send("updateMessage", message)
}