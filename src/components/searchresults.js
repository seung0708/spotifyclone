const Searchresults = ({songs}) => {
  return (
    <div>
      {songs.map(song => (
        <h2>{song.name}</h2>
      ))}
    </div>
  )
}

export default Searchresults