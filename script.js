// Llegeix ?song=...
const params = new URLSearchParams(window.location.search);
const songKey = params.get("song");

// Si no hi ha paràmetre, parem
if (!songKey) {
  document.body.innerHTML = "<p>Cap cançó seleccionada</p>";
  throw new Error("No song parameter");
}

// Carrega el JSON
fetch("songs_mapping.json")
  .then(response => response.json())
  .then(songs => {
    const song = songs[songKey];

    if (!song) {
      document.body.innerHTML = "<p>Cançó no trobada</p>";
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://open.spotify.com/embed/track/${song.spotifyId}`;
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.frameBorder = "0";

    const container = document.getElementById("player");
    container.prepend(iframe);
  });
