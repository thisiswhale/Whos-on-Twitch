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
let usersOnline = [];
let usersData = [];
function getTwitch() {
  for (let i = 0; i < channels.length; i++) {
    //fetch data for display name, status, and profile
    fetch('https://api.twitch.tv/kraken/channels/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
      usersData.push({display_name: data.display_name, status: data.status, livestatus: "", image: data.logo})

      fetch('https://api.twitch.tv/kraken/streams/' + channels[i] + '?client_id=8x7lfisepsjsqcdvzuaclgudhigsv7').then(response => response.json()).then(data => {
        (data.stream == null)
          ? usersData[i].livestatus = 'Offline'
          : usersData[i].livestatus = 'Online'
      });
    });
  }
  Render(usersData);
}
getTwitch();

const all = document.querySelector('#all');
const online = document.querySelector('#online');
const offline = document.querySelector('#offline');

function Render(data) {
  console.log(data);
  for(let key in data){
    console.log(key)
  }
  const dataRender = data.map(user => `
  <div class='users ${ (user.livestatus == 'Online') ? 'online': 'offline'}'>
    <img class="profile-image" src="${user.image}" alt="">
    <span class='display-name'>${user.display_name}</span>
    <i class="fa fa-bolt" aria-hidden="true"></i>
  </div>
`).join('');

  document.querySelector('#all').innerHTML = dataRender;
}
function renderResults(data) {
  const dataRender = data.map(result => `
      <div class='result-box'>
         <h3 class='result-title'
           onclick="location.href='https://en.wikipedia.org/?curid=${result.pageid}'" data-key="${result.pageid}">${result.title}
         </h3>
         <p class='result-extract'>${result.extract}</p>
    </div>`).join('');
  list.innerHTML = dataRender;
  document.querySelector('#render-box').style.opacity = "1";
}
