const { viewFile, sizes } = require('./config.json');
const { Window } = require('../windows-manager.js');

class Loader {
  constructor() {

  }

  createLoaderWindow() {
    const loaderPage = new Window({
      width: sizes.width,
      height: sizes.height,
      file: viewFile,
    });
    return loaderPage;
  }

  createAndOpenLoaderWindow() {
    let loaderPage = this.createLoaderWindow();
    loaderPage.openNewWindow();
  }

  begin() {
    this.createAndOpenLoaderWindow()
  }
}

function beginLoader() {
  loader = new Loader();
  return loader.begin();
}

module.exports.beginLoader = beginLoader;