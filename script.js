const params = new URLSearchParams(window.location.search);
fetch("songs.json")
  .then(response => response.json())
  .then(data => {
    const songId = data.song_id;

    const iframe = document.createElement("iframe");
    iframe.src = `https://open.spotify.com/embed/track/${songId}?utm_source=generator&theme=0`;
    iframe.width = "300";
    iframe.height = "80";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

    document.getElementById("player").appendChild(iframe);
  });
