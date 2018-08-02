const fs = require('fs');
const natural = require('natural');
const _ = require('lodash');

const mapWordToWord = {};

tokenizer = new natural.WordTokenizer();
linetokenizer = new natural.SentenceTokenizer();

function isUpperCase(aCharacter) {
  return aCharacter >= 'A' && aCharacter <= 'Z';
}

function isCapitalWord(word) {
  return true; // isUpperCase(word.charAt(0));
}

fs.readFile('./text1.txt', { encoding: 'utf-8' }, (err, data) => {
  data = data.replace(/['"]+/g, '');

  const words = _.uniq(tokenizer.tokenize(data).filter(isCapitalWord)); // data.split(/[, ]+/)
  // console.log('words: ', words);
  const lines = linetokenizer.tokenize(data); // data.match(/[^\r\n]+/g);
  // console.log('lines: ', lines);

  words.forEach(word => {
    lines.forEach(line => {
      const wordsInLine = tokenizer.tokenize(line).filter(isCapitalWord); // line.split(' ');
      for (let wil of wordsInLine) {
        if (word !== wil) {
          if (line.includes(word) && line.includes(wil)) {
            if (mapWordToWord[word] && mapWordToWord[word][wil]) {
              mapWordToWord[word][wil] = mapWordToWord[word][wil] + 1;
              continue;
            }

            if (mapWordToWord[wil] && mapWordToWord[wil][word]) {
              mapWordToWord[wil][word] = mapWordToWord[wil][word] + 1;
              continue;
            }

            mapWordToWord[word] = {
              [wil]: 1
            };
          }
        }
      }
    });
  });

  // console.log(mapWordToWord);
  const result = Object.keys(mapWordToWord).map(key => {
    const source = key;
    const target = Object.keys(mapWordToWord[source])[0];
    const value = mapWordToWord[source][target];
    return {
      source,
      target,
      value: 1 / value
    };
  });

  // console.log(result);

  const finalData = {
    nodes: words.map(w => {
      return {
        id: w
      };
    }),
    links: result
  };

  fs.writeFile('data3.json', JSON.stringify(finalData), 'utf8', () =>
    console.log('Done')
  );
});
