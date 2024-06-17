const Track = ({song}) => {
  return (
    <div>
        <h2>{song.name}</h2>
        <p>{song.album}</p>
        <p>{song.artist}</p>
    </div>
  )
}

export default Track