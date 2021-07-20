const { app, BrowserWindow } = require('electron');
const {templatesFileRute, viewFilenames} = require('./windows-config.json');


class MainWindowsManager {
  constructor() {
    this.templatesFileRute = templatesFileRute;
  }
}

class Window {
  constructor() {

  }

  create() {
    const newWindow = new BrowserWindow({
      width: 400,
      height: 500,
      frame: false
    });

    newWindow.loadFile('view_templates/loader.html');
  }

  openNewWindow() {
    app.whenReady().then(() => {
      this.create();
    })
  }
}

module.exports.Window = Window;
