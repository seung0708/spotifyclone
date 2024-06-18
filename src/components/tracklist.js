import Track from './track';
const Tracklist = ({songs, onAdd}) => {
  return (
    <div>
      {songs.map(song => (
        <Track song={song} onAdd={onAdd} />
      ))}
    </div>
  )
}

export default Tracklist