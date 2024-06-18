import Tracklist from './tracklist'
const Searchresults = ({songs, onAdd}) => {
    return (
      <Tracklist songs={songs} onAdd={onAdd} />      
  )
}

export default Searchresults