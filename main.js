const {beginLoader} = require('./windows/loader/loader.js');
const {
  handleSearching,
  handleMaches,
  dictionariesNames,
} = require("./search process/search handle.js");
const { checkUpdates } = require("./updates.js");
const {Window} = require('./windows/windows-manager');

beginLoader();
handleSearching();
handleMaches();
dictionariesNames();
checkUpdates();