import React, { useCallback } from 'react'

const Playlist = ({playlist, onRemove, onNameChange, onSave}) => { 

  const handleNameChange = useCallback(event => {
    onNameChange(event.target.value)
  }, [onNameChange])

  return (
    <div>
      <input onChange={handleNameChange} placeholder='New Playlist' />
      <div>
        {playlist.map(song => (
          <>
          <h2>{song.name}</h2>
          <button onClick={() => onRemove(song)}>X</button>
          </>
        ))}
         <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
      </div>
    </div>
  )
}

export default Playlist