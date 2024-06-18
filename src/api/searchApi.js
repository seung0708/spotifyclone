export const searchTrackApi = async (access_token, term) => {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const data = await response.json();
    console.log(data.tracks.items)

    return data.tracks.items.map(track => (
        {
            id: track.id,
            name: track.name, 
            artist: track.artists[0].name, 
            album: track.album.name,
            uri: track.uri
        }
    ))
}