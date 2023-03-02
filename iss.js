const request = require('request');

const fetchMyIP = function(callback) {
  
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const {ip} = JSON.parse(body);
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // console.log(response);
    // console.log(response.statusCode);

    const data = JSON.parse(body);
    console.log(data);

    if (!data.success) {
      const msg = `Success status was: ${data.success}. Server message says: ${data.message} when fetching coordinates.`;
      callback((msg), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body);

    callback(null, {latitude, longitude});
  });

};


module.exports = {fetchMyIP, fetchCoordsByIP};
