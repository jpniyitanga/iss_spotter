
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

//1. GET Your IP First function
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  //2. After getting the IP, We call the second function and pass the IP to that
  fetchCoordsByIP(ip, (error, coords)=>{
    if (error) {
      console.log(`It didn't work! ${error}`);
      return;
    }
    console.log('It worked! Returned coordinates are: ' , coords);
    //3. CAll the third function after receiving the Coordinates
    fetchISSFlyOverTimes(coords, (error, data) => {
      if (error) {
        console.log(`It didn't work! ${error}`);
        return;
      }
      console.log('It worked! Returned data are: ', data);
    });
  });
  
});




