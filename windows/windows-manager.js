const { app, BrowserWindow } = require('electron');

class Window {
  constructor({
      width,
      height,
      file
    }) {
      this.width = width;
      this.height = height;
      this.file = file;
  }

  create() {
    const newWindow = new BrowserWindow({
      width: this.width,
      height: this.height,
      frame: false,
      icon: './windows/icon.png'
    });
    newWindow.loadFile(this.file);
  }

  whenAppReadyCreateWindow() {
    app.whenReady().then(() => {
      this.create();
    });
  }

  openNewWindow() {
    this.whenAppReadyCreateWindow();
  }
}

module.exports.Window = Window;
