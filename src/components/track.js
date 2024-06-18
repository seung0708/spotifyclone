import React, { useCallback } from "react";


const Track = ({song, onAdd}) => {
  const addTrack = useCallback(
    () => {
      console.log(song)
      onAdd(song);
    },
    [onAdd, song]
  );
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
        <h2>{song.title}</h2>
        <p>{song.album}</p>
        <p>{song.artist}</p>
        <button onClick={addTrack}>+</button>
    </div>
  )
}

export default Track