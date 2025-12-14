let player;
let token; // Token Spotify que obtindràs via OAuth

// 1. Llegir token de la URL després del login OAuth
const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
token = params.get('access_token');

if (!token) {
  alert("Necessites autenticar-te amb Spotify!");
}

// 2. Llegir ID de cançó del paràmetre ?song=ID
const urlParams = new URLSearchParams(window.location.search);
const songId = parseInt(urlParams.get('song'), 10);

fetch('songs.json')
  .then(res => res.json())
  .then(songs => {
    const song = songs.find(s => s.id === songId);
    if (!song) return alert("Cançó no trobada!");

    const duration = song.duration_sec;
    const trackURI = song.spotify_uri;

    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new Spotify.Player({
        name: 'Hitster Casolà',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Device ready', device_id);

        document.getElementById('playBtn').addEventListener('click', () => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [trackURI] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          // Timer de fragment
          let time = duration;
          const timerDiv = document.getElementById('timer');
          timerDiv.innerText = `00:${time}`;
          const interval = setInterval(() => {
            time--;
            timerDiv.innerText = `00:${time < 10 ? '0'+time : time}`;
            if(time <= 0){
              player.pause();
              clearInterval(interval);
            }
          }, 1000);
        });
      });

      player.connect();
    };
  });
