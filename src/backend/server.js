const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '8e343bd24865f49e56ffb12348bb9ccf';
const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';

app.get('/api/top-artists', async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}chart.artists.get`, {
      params: {
        apikey: API_KEY,
        country: 'us',
        page: 1,
        page_size: 3 // Get 3 top artists
      }
    });

    const artists = data.message.body.artist_list.map(artist => ({
      id: artist.artist.artist_id,
      name: artist.artist.artist_name
    }));

    // Fetch latest 2 albums for each artist
    const artistAlbumsPromises = artists.map(async (artist) => {
      const albumData = await axios.get(`${BASE_URL}artist.albums.get`, {
        params: {
          apikey: API_KEY,
          artist_id: artist.id,
          page: 1,
          page_size: 2, // Get last 2 albums
          s_release_date: 'desc'
        }
      });

      const albums = albumData.data.message.body.album_list.map(album => ({
        id: album.album.album_id,
        name: album.album.album_name,
        release_date: album.album.album_release_date
      }));

      // Fetch tracks for each album
      const albumTracksPromises = albums.map(async (album) => {
        const trackData = await axios.get(`${BASE_URL}album.tracks.get`, {
          params: {
            apikey: API_KEY,
            album_id: album.id,
            page: 1,
            page_size: 2 // Get 2 tracks per album
          }
        });

        const tracks = trackData.data.message.body.track_list.map(track => ({
          id: track.track.track_id,
          name: track.track.track_name
        }));

        // Fetch lyrics for each track
        const trackLyricsPromises = tracks.map(async (track) => {
          try {
            const lyricsData = await axios.get(`${BASE_URL}track.lyrics.get`, {
              params: { apikey: API_KEY, track_id: track.id }
            });

            return {
              name: track.name,
              lyrics: lyricsData.data.message.body.lyrics.lyrics_body || 'Lyrics not available'
            };
          } catch (error) {
            return { name: track.name, lyrics: 'Lyrics not found' };
          }
        });

        const trackResults = await Promise.all(trackLyricsPromises);

        return {
          ...album,
          tracks: trackResults
        };
      });

      const albumResults = await Promise.all(albumTracksPromises);

      return {
        artist: artist.name,
        albums: albumResults
      };
    });

    const results = await Promise.all(artistAlbumsPromises);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(5001, () => console.log('Backend running on port 5001'));