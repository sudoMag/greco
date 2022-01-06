const { ipcMain } = require("electron");
const { version } = require("./package.json");

function checkUpdates() {
  const actualVersion = "0.0.2";
  let updateMessage = 'no updates';
  ipcMain.on("searchUpdates", async (event) => {
    console.log("version", version);
    if (version < actualVersion) {
        updateMessage = {
            version: '0.0.2',
            title: 'new version 0.0.2 avilable!',
            donloadLink: 'http//:grecoapp.vercel.app'
        };
    }
    event.returnValue = updateMessage;
  });
}

module.exports.checkUpdates = checkUpdates;
