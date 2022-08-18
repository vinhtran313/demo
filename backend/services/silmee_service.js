const axios = require('axios');

async function getKey() {
  const { data } = await axios.post(process.env.PROXY_SERVER, {
    method: 'POST',
    path: `${process.env.SILMEE_API_ENDPOINT}/service/login/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: process.env.SILMEE_USERNAME,
      password: process.env.SILMEE_PASSWORD
    }
  });
  return data.key;
}

async function readWristband(req, res) {
  const deviceId = '008098421439';
  const key = await getKey();
  const { data } = await axios.post(process.env.PROXY_SERVER, {
    method: 'GET',
    path: `${process.env.SILMEE_API_ENDPOINT}/res/wristband/id/${deviceId}/`,
    headers: {
      Authorization: `Token ${key}`,
      'Content-Type': 'application/json',
    }
  });
  console.log('data', data);
  res.json({ data });
}

async function readVital({ ts, te, deviceUser, page }) {
  // ts and te is upload_time in result
  const key = await getKey();
  let path = `${process.env.SILMEE_API_ENDPOINT}/res/vital/${deviceUser}?page=${page}`;
  if (ts) {
    path += `&ts=${ts}`;
  }
  if (te) {
    path += `&te=${te}`;
  }
  const { data } = await axios.post(process.env.PROXY_SERVER, {
    method: 'GET',
    path,
    headers: {
      Authorization: `Token ${key}`,
      'Content-Type': 'application/json',
    }
  });
  console.log('readVital', data);
  return data;
}

module.exports = {
  readVital,
  readWristband
}
