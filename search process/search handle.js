const {ipcMain} = require('electron');
const {dictionaries} = require("./dictionary.json");

const wordsMarking = true;

const forEachWordInEachDicitonary = (callbackFunction, ...args) => {
  for (let listName in dictionaries) {
    for (wordFromDictionary in dictionaries[listName]) {
      callbackFunction({
        listName,
        wordFromDictionary
      }, ...args);
    }
  }
}

const forEachDictionary = (callbackFunction, ...args) => {
  for (let listName in dictionaries) {
    callbackFunction({
      listName
    }, ...args);
  }
}

const bringAllFromDictionaries = word => {
  let results = {}

  for (let listName in dictionaries) {
    if (dictionaries[listName][word]) {
      results[listName] = dictionaries[listName][word];
    }
  }
  return results;

}
const bringFromDictionaries = (word) => {
  for (let listName in dictionaries) {
    if (dictionaries[listName][word]) {
      let definition = dictionaries[listName][word];

      return {
        listName,
        definition
      }
    }
    return false;
  }
}

const bringSimilarFromDictionaries = (word) => {
  let results = [];
  forEachWordInEachDicitonary(({wordFromDictionary}) => {
    let similarLetters = []; 
    for (letter of wordFromDictionary) {
      if (word.includes(letter) && !similarLetters.includes(letter)) {
        similarLetters[similarLetters.length] = letter;
      }
    }
    const porcent = similarLetters.length / wordFromDictionary.length * 100;

    if (wordFromDictionary.length >= word.length - 2
      && wordFromDictionary.length <= word.length + 2
      && porcent >= 70
      && word !== wordFromDictionary) 
    {
      results[results.length] = wordFromDictionary;
    }
  });
  return results;
}

const viewDictionaryNames = () => {
  const dictionaryNames = [];

  forEachDictionary(({listName}) => {
    dictionaryNames[dictionaryNames.length] = listName;
  });
  return dictionaryNames;
}

const handleSearching = () => {   

    ipcMain.on('searching', async (event, word) => {

        var markList = [];
        var referencesDefiniton = {};
        var errors = [];
        var results = [
          markList, 
          bringAllFromDictionaries(word), 
          referencesDefiniton,
          bringSimilarFromDictionaries(word),
          errors
        ];

        if (Object.entries(results[1]).length === 0) {
          results[1] = "no results";
        }

        if (results[1] && wordsMarking === true) {
          Object.entries(results[1]).forEach(result => {
            result[1].split(" ").forEach((word) => {
              if (bringFromDictionaries(word)) {
                markList[markList.length] = word;
                if (!referencesDefiniton[word]) {
                  let {definition} = bringFromDictionaries(word);
                  referencesDefiniton[word] = definition;
                }
              }
            });
          });
        }
        setTimeout(() => {
          errors = ['time out'];
          return event.returnValue = results;
        }, 10000);
        return event.returnValue = results;
      })
}

const handleMaches = () => {
  ipcMain.on('consulting', async (event, arg) => {
    let restOfMachingTextGroup = [];

    forEachWordInEachDicitonary(({wordFromDictionary}) => {
        let machingText = wordFromDictionary.slice(0, arg.length);
        let targetHaveResult = arg.includes(machingText);
        if (targetHaveResult) {
          let wordSliced = wordFromDictionary.slice(arg.length, wordFromDictionary.length);
            if (!restOfMachingTextGroup.includes(wordSliced)) {
              restOfMachingTextGroup[restOfMachingTextGroup.length] = wordSliced;
            }
        }
    });
    event.returnValue = restOfMachingTextGroup;
  });
}

const dictionariesNames = () => {
  ipcMain.on('dictionariesNames', async (event) => {
    const result = await viewDictionaryNames();
    event.returnValue = result;
  });
}

module.exports.handleSearching = handleSearching;
module.exports.handleMaches = handleMaches;
module.exports.dictionariesNames = dictionariesNames;