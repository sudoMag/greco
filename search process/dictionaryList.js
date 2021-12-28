const {dictionary} = require('./dictionary.json');

var result1 = [];
var result2 = [];

for (word in dictionary) {
    if (Object.entries(dictionary[word])[0][0] === 
        'Diccionario Geografía Aplicada y Gestión del Territorio') {
            result2[result2.length] = `"${word}": "${ Object.entries(dictionary[word])[0][1]}",`;
    } else if (Object.entries(dictionary[word])[0][0] === 
    'glosario de arquitectura, INPC de ecuador') {
        result1[result1.length] = `        "${word}": "${ Object.entries(dictionary[word])[0][1]}",`;
    }
}

result2.forEach(eachWord => {
    console.log(eachWord);
})

//console.log(result1.length);
//console.log(result2);