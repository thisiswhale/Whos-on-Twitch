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

for (let i = 0; i < channels.length; i++) {
  //fetch data for display name, status, and profile
  fetch('https://api.twitch.tv/kraken/channels/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
    usersData.push({display_name: data.display_name, status: data.status, livestatus: "", image: data.logo, url: data.url})

    fetch('https://api.twitch.tv/kraken/streams/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
      (data.stream == null)
        ? usersData[i].livestatus = 'Offline'
        : usersData[i].livestatus = 'Online';

      let render = `
            <img class="profile-image" src="${usersData[i].image}" alt="">
            <span class='display-name' onclick="location.href='${usersData[i].url}'" >${usersData[i].display_name}</span><br>
            <p class='display-status'>${usersData[i].status}</p>
            ${ (usersData[i].livestatus == 'Online')
        ? '<i class="fa fa-bolt fa-lg" aria-hidden="true"></i>'
        : '<i class="fa fa-times fa-lg" aria-hidden="true"></i>'}
        `;
      //note: we are creating a node, so it can be used once, else error
      let newDiv1 = document.createElement("div");
      newDiv1.setAttribute(
        'class', `streamer ${ (usersData[i].livestatus == 'Online')
        ? 'online'
        : 'offline'}`);
      newDiv1.innerHTML = render;
      all.appendChild(newDiv1);
      //create a duplicate
      let newDiv2 = document.createElement("div");
      newDiv2.setAttribute(
        'class', `streamer ${ (usersData[i].livestatus == 'Online')
        ? 'online'
        : 'offline'}`);
      newDiv2.innerHTML = render;
      (usersData[i].livestatus == 'Online')
        ? online.appendChild(newDiv2)
        : offline.appendChild(newDiv2);

    });
  });
}

//A function to filter tab items when All, Online, Offline is clicked.
function openTab(event, tabName) {

  let x = document.getElementsByClassName("tab");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
  let tablinks = document.getElementsByClassName("tab-bar-item");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-active", "");
  }
  event.currentTarget.className += " tab-active";
}

//function for filtering the list
const searchInput = document.querySelector('input');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

function findMatches(wordToMatch, usersData) {
  return usersData.filter(streamer => {
    //figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return streamer.display_name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, usersData);

  //empty all the content in each div
  all.innerHTML = "";
  online.innerHTML = "";
  offline.innerHTML = "";
  //get the array to render again the divs
  for (let i = 0; i < matchArray.length; i++) {
    let newDisplay = `
        <img class="profile-image" src="${matchArray[i].image}" alt="">
        <span class='display-name' onclick="location.href='${matchArray[i].url}'" >${matchArray[i].display_name}</span><br>
        <p class='display-status'>${matchArray[i].status}</p>
        ${ (matchArray[i].livestatus == 'Online')
      ? '<i class="fa fa-bolt fa-lg" aria-hidden="true"></i>'
      : '<i class="fa fa-times fa-lg" aria-hidden="true"></i>'}
    `;

    let newDiv = document.createElement("div");
    newDiv.setAttribute(
      'class', `streamer ${ (matchArray[i].livestatus == 'Online')
      ? 'online'
      : 'offline'}`);
    newDiv.innerHTML = newDisplay;
    all.appendChild(newDiv);

    let newDiv2 = document.createElement("div");
    newDiv2.setAttribute(
      'class', `streamer ${ (matchArray[i].livestatus == 'Online')
      ? 'online'
      : 'offline'}`);
    newDiv2.innerHTML = newDisplay;
    (matchArray[i].livestatus == 'Online')
      ? online.appendChild(newDiv2)
      : offline.appendChild(newDiv2);
  }
}
