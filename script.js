const params = new URLSearchParams(window.location.search);
const songId = params.get("song");

const playerDiv = document.getElementById("player");
playerDiv.innerHTML = ""; // IMPORTANT: neteja abans

if (songId) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://open.spotify.com/embed/track/${songId}?theme=0`;
  iframe.width = "300";
  iframe.height = "80";
  iframe.frameBorder = "0";
  iframe.allow =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

  playerDiv.appendChild(iframe);
}
