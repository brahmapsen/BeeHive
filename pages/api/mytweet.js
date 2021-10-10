import axios from "axios"; // axios requests

const twitterToken = process.env.TWITTER_TOKEN;
const twitterId = process.env.TWITTER_ID;

module.exports = async (req, res) => {
  console.log("call twiter api from local---")
  const address = req.address;
  const config = {
    method: 'get',
    url: `https://api.twitter.com/2/users/${twitterId}/tweets?tweet.fields=text&max_results=5`,
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Authorization': `${process.env.TWITTER_TOKEN}`
    }
  }
  let _res = await axios(config)
  console.log(_res.data);
  const _data = _res.data.data.data;
  let foundFlag = false;
  _data.map( (row) => { 
    row.text == address ? setTwitterMention(true) : '';
  })
  console.log(" Found: ", foundFlag)
  res.status(200).json({found:foundFlag});
};
