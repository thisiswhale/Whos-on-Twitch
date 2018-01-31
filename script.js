let channels = [
  "ESL_SC2",
  "OgamingSC2",
  "dyrus",
  "scarra",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

let usersData = [];

const all = document.querySelector('#all');
const online = document.querySelector('#online');
const offline = document.querySelector('#offline');
const searchInput = document.querySelector('input');
// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);


for (let i = 0; i < channels.length; i++) {
  //fetch data for display name, status, and profile
  fetch('https://api.twitch.tv/kraken/channels/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
    usersData.push({display_name: data.display_name, status: data.status, livestatus: "", image: data.logo, url: data.url})

    fetch('https://api.twitch.tv/kraken/streams/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
      (data.stream == null) ? usersData[i].livestatus = 'Offline' : usersData[i].livestatus = 'Online';

      let render = `
            <img class="profile-image" src="${usersData[i].image}" alt="">
            <span class='display-name' onclick="location.href='${usersData[i].url}'" >${usersData[i].display_name}</span>
            <span class='display-status'>${usersData[i].status}</span>
            ${ (usersData[i].livestatus == 'Online')? '<i class="fa fa-bolt fa-lg" aria-hidden="true"></i>': '<i class="fa fa-times fa-lg" aria-hidden="true"></i>'}
        `;
      //note: we are creating a node, so it can be used once, else error
      let newDiv1 = document.createElement("div");
        newDiv1.setAttribute('class', `streamer ${ (usersData[i].livestatus == 'Online')? 'online': 'offline'}`);
        newDiv1.innerHTML = render;
      all.appendChild(newDiv1);
      //create a duplicate
      let newDiv2 = document.createElement("div");
        newDiv2.setAttribute('class', `streamer ${ (usersData[i].livestatus == 'Online')? 'online': 'offline'}`);
        newDiv2.innerHTML = render;
      (usersData[i].livestatus == 'Online')? online.appendChild(newDiv2) : offline.appendChild(newDiv2);

    });
  });
}
