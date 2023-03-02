
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// //1. GET Your IP First function
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   //2. After getting the IP, We call the second function and pass the IP to that
//   fetchCoordsByIP(ip, (error, coords)=>{
//     if (error) {
//       console.log(`It didn't work! ${error}`);
//       return;
//     }
//     console.log('It worked! Returned coordinates are: ' , coords);
//     //3. CAll the third function after receiving the Coordinates
//     fetchISSFlyOverTimes(coords, (error, data) => {
//       if (error) {
//         console.log(`It didn't work! ${error}`);
//         return;
//       }
//       console.log('It worked! Returned data are: ', data);
//     });
//   });
  
// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    // console.log(pass.risetime);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }

};



nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
  console.log('It worked! Returned data are: ');
  printPassTimes(passes);
});




