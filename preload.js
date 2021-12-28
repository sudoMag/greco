const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    search: async (arg) =>  {
        const result = await ipcRenderer.sendSync('searching', arg);
        return result;
    }, 
    consult: async (arg) =>  {
      const result = await ipcRenderer.sendSync('consulting', arg);
      return result;
    },
    dictionaryNames: async () => {
      const results = await ipcRenderer.sendSync('dictionariesNames');
      return results;
    }
  }
)