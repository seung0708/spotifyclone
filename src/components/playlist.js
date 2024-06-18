import React from 'react'

const Playlist = ({playlistName, playlist}) => {
  return (
    <div>
      <input placeholder={playlistName} />
      <div>
        {playlist.map(song => (
          <h2>{song.name}</h2>
        ))}
      </div>
    </div>
  )
}

export default Playlist