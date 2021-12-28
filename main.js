const {beginLoader} = require('./windows/loader/loader.js');
const {handleSearching, handleMaches, dictionariesNames} = require('./search process/search handle.js');


beginLoader();
handleSearching();
handleMaches();
dictionariesNames();