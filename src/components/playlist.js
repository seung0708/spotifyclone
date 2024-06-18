import React from 'react'

const Playlist = ({playlistName, playlist, onRemove}) => {
  return (
    <div>
      <input placeholder={playlistName} />
      <div>
        {playlist.map(song => (
          <>
          <h2>{song.name}</h2>
          <button onClick={(song) => onRemove(song)}>X</button>
          </>
        ))}
      </div>
    </div>
  )
}

export default Playlist