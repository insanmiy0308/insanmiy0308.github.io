// spotify.js

// 🔒 Store your token in localStorage so you don't need to paste it every refresh
let accessToken = localStorage.getItem('spotify_access_token');

// Prompt for token if none is stored
if (!accessToken) {
  accessToken = prompt("Enter your Spotify access token:");
  if (accessToken) localStorage.setItem('spotify_access_token', accessToken);
}

// Function to fetch and show the current track
async function getNowPlaying() {
  const box = document.getElementById("nowPlaying");

  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204) {
      box.innerHTML = "🎧 Nothing is playing right now.";
      return;
    }

    if (!response.ok) {
      box.innerHTML = "⚠️ Token expired or invalid. Please refresh it.";
      localStorage.removeItem('spotify_access_token');
      return;
    }

    const data = await response.json();
    if (!data.item) {
      box.innerHTML = "🎧 Nothing is playing right now.";
      return;
    }

    const song = data.item.name;
    const artist = data.item.artists.map(a => a.name).join(", ");
    const image = data.item.album.images[0].url;
    const url = data.item.external_urls.spotify;

    box.innerHTML = `
      <a href="${url}" target="_blank" style="text-decoration:none;color:#1e6fff;display:flex;align-items:center;gap:10px;">
        <img src="${image}" width="64" height="64" style="border-radius:8px;">
        <span><strong>${song}</strong><br><small>${artist}</small></span>
      </a>
    `;
  } catch (err) {
    console.error(err);
    box.innerHTML = "❌ Error loading Spotify data.";
  }
}

// Run immediately and refresh every 15 seconds
getNowPlaying();
setInterval(getNowPlaying, 15000);
