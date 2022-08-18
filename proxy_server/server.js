const express = require('express');
const app = express()
const axios = require('axios');
const fetch = require('node-fetch');

const port = process.env.APP_PORT || 3001

app.use(express.json())

app.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const method = req.body.method.toUpperCase();
    let data
    if (method === 'POST') {
      data = await axios.post(req.body.path, req.body.data, {
        headers: req.body.headers
      });
      console.log('data', data.data);
      res.status(200).json(data.data);
    } else if (method === 'PUT') {
      data = await axios.put(req.body.path, req.body.data, {
        headers: req.body.headers
      });
      console.log('data', data.data);
      res.status(200).json(data.data);
    } else if (method === 'GET') {

      // data = await axios.get(req.body.path, { params: req.body.params }, {
      //   headers: req.body.headers
      // });
      data = await fetch(req.body.path, { headers: req.body.headers })
	    data = await data.json();
      console.log('data', data);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
