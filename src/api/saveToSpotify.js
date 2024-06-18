const getUserId = async (token) => {
    let userId = '';
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const jsonResponse = await response.json(); 
    userId = jsonResponse.id
    return userId
}

const getPlaylistId = async (token, name) => {
    let playlistId = '';
    let userId = await getUserId(token);
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    })
    const jsonResponse = await response.json(); 
    playlistId = jsonResponse.id;
    return playlistId;
}

export async function saveToSpotify(token, name, songUris) {
    console.log(songUris)
    let userId = await getUserId(token);
    let playlistId = await getPlaylistId(token, name); 
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uris: songUris})
    })

    const jsonResponse = await response.json();
    console.log(jsonResponse)
}