import { LoremIpsum } from "lorem-ipsum";
import { delay } from "q";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const articles = []

const capitalize = (str) => {
    if(str.indexOf(' ') >= 0) return (
      str.split(' ').map(str => capitalize(str)).join(' ')
    ) 
    return str.charAt(0).toUpperCase() + str.slice(1);
}


for(let i =0; i<100; i++) {
    articles.push(
        {
            title: capitalize(lorem.generateWords(Math.ceil(Math.random()*4))),
            body: lorem.generateParagraphs(15 + Math.floor(Math.random()*7))
        }
    )
}

export async function fetchArticles(searchText) {
    if(!searchText) searchText= ''

    const regex = new RegExp(searchText, 'i')
    console.log(regex)
    await delay(200)
    const fetchResult = articles.filter(article => regex.test(article.title)).slice(0,10)
    console.log('fetch result',fetchResult)
    return fetchResult
}

export default articles