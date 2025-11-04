async function loadNowPlaying() {
  const box = document.getElementById("nowPlaying");

  // get token from your backend
  const tokenRes = await fetch("/token");
  const { access_token } = await tokenRes.json();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  if (res.status === 204) {
    box.textContent = "Nothing playing right now.";
    return;
  }

  const data = await res.json();
  if (data && data.item) {
    const { name, artists, album } = data.item;
    const artistNames = artists.map((a) => a.name).join(", ");
    box.innerHTML = `
      <img src="${album.images[0].url}" width="64" style="border-radius:8px"><br>
      <strong>${name}</strong><br>${artistNames}
    `;
  } else {
    box.textContent = "Nothing playing right now.";
  }
}

loadNowPlaying();
setInterval(loadNowPlaying, 15000); // refresh every 15s
