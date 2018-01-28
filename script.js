var users = ["ESL_SC2", "OgamingSC2", "dyrus","scarra", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var usersOnline = [];

users.forEach(el => {
  fetch('https://api.twitch.tv/kraken/channels/'+el+'?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7' ).then(response => response.json())
        .then( data =>{
          console.log(data)
        });
  fetch('https://api.twitch.tv/kraken/streams/'+el+'?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7' ).then(response => response.json())
              .then( data =>{
                usersOnline.push(data.stream)
              });
});
console.log(usersOnline)

//need display Name, status, profile and online status
