import Track from './track'
const Searchresults = ({songs}) => {
    return (
    <div className="songs_results">
      {songs.map(song => 
      <Track song={song} />      
    )}
    </div>
  )
}

export default Searchresults