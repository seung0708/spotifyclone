import '../styles/searchbar.css'
const Searchbar = ({onChange, onSearch}) => {
  return (
      <form onSubmit={onSearch}>
        <input onChange={onChange} className="searchbar" placeholder="What do you want to play?" />
      </form>
  )
}

export default Searchbar