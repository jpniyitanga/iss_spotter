const request = require('request-promise-native');
const nextISSTimesForMyLocation = require('./iss_promised');

// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');
// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));



nextISSTimesForMyLocation()
  .then((passTimes) =>{
    console.log(passTimes);
  })

  .catch((error) => {
    console.log(`It didn't work: ${error.message}`);
  });
