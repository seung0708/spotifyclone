import React, { useCallback } from "react";


const Track = ({song, onAdd}) => {
  const handleAddTrack = () => {
    onAdd(song);
  }
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
        <h2>{song.title}</h2>
        <p>{song.album}</p>
        <p>{song.artist}</p>
        <button onClick={handleAddTrack}>+</button>
    </div>
  )
}

export default Track