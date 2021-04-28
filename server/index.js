const axios = require('axios')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/news', async (req, res) => {
    console.log('in news api',req.query)
    let keyword = req.query.keyword || 'tesla'; // $_GET["id"]
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from=2021-04-28&sortBy=publishedAt&apiKey=6e41b38902c24d9eac1b02b26897c3e7`)
        res.status(200).send(response.data)
    }catch(e) {
        res.send(e)
    }
  });

app.listen(8081, () =>
  console.log('Express server is running on localhost:8080')
);

