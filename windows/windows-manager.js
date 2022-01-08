const { app, BrowserWindow } = require('electron');
const path = require('path');

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
      minWidth: this.width,
      minHeight: this.height,
      frame: true,
      icon: './windows/icon.png',
      webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js')
      },
      title: 'GRECO'
    });
    //newWindow.removeMenu(); //<-- comment in production
    
    newWindow.loadURL('http://localhost:3000'); // <-- dev
    //newWindow.loadFile('./react-app/build/index.html') // <-- build 
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
