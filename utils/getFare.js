const axios = require('axios');
const timeago = require('timeago.js');
const dayjs = require('dayjs');

const getFare = async (date) => {
  console.log('start fetching getFare')
  try {
    const res = await axios.post(`https://flights.ctrip.com/itinerary/api/12808/products`, {
      airportParams: [
        {
          acity: "SZX",
          acityid: 30,
          acityname: "深圳",
          date: "2020-10-05",
          dcity: "SHA",
          dcityid: 2,
          dcityname: "上海"
        }
      ],
      classType: "ALL",
      date: dayjs(date).format('YYYY-MM-DD'),
      flightWay: "Oneway",
      hasBaby: false,
      hasChild: false,
      searchIndex: 1
    });
    let contents = '';
    if (res.status != 0 || !res.data) {
      contents = '获取数据失败！';
    } else {
      contents = top10Objs
        .map((obj, i) => {
          let { title, created_at, url, author, points, objectID, num_comments } = obj;
          if(!url) url = `https://news.ycombinator.com/item?id=${objectID}`;
  
          return `${i + 1}. **[${title}](${url})**
  ${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID})
  
  `;
        }).join('');
    }
    return contents;
  } catch (error) {
    console.log(error);
    throw error
  }

}

module.exports = getHeadlines;


// getHeadlines(new Date())
