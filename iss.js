const request = require('request');

//1. First function call
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
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
    
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }
    
 

    const data = JSON.parse(body);
    // console.log(data);

    if (!data.success) {
      const msg = `Success status was: ${data.success}. Server message says: ${data.message} when fetching coordinates.`;
      callback((msg), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body);

    callback(null, {latitude, longitude});
  });

};



const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching ISSFlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
    }
    
    const result = JSON.parse(body).response;

    callback(null, result);
  });

};



const nextISSTimesForMyLocation = function(callback)  {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, result) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, result);
      });
    });
  });

};


module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
