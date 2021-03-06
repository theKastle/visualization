import googleTrends from 'google-trends-api';
import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://secret-sands-51319.herokuapp.com'
    : 'http://localhost:5000';

const getData = (info, keyword) =>
  new Promise((resolve, reject) => {
    console.log('KEYWORD --> ', keyword);
    axios
      .get(`${baseUrl}/${info}?keyword=${keyword}`)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      });
    // googleTrends
    //   .relatedTopics({ keyword: 'North Korea' })
    //   .then(function(results) {
    //     const parsedResult = JSON.parse(results);
    //     const finalResult = parsedResult.default.rankedList[0].rankedKeyword.map(
    //       t => {
    //         console.log(t);
    //         return {
    //           id: t.topic.title,
    //           value: t.value,
    //           type: t.topic.type
    //         };
    //       }
    //     );
    //     return resolve(finalResult);
    //   })
    //   .catch(function(err) {
    //     console.error('Oh no there was an error', err);
    //     return reject(err);
    //   });
  });

export default getData;
