import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {

  const [pokemonName, setPokemonName] = useState("")
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  })


  const searchPokemon = () => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      setPokemonChosen(true)
      setError(false)
      setPokemon({
        name: pokemonName,
        number: res.data.id,
        species: res.data.species.name,
        image: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
				type: res.data.types[0].type.name,
      })
    })
    .finally(() => setLoading(false))
    .catch((err) => {
      console.log(err)
      setPokemonChosen(false)
      setError(true)
      setLoading(false)
    })
  }
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokedex</h1>
        <input 
        type="text" 
        onChange={(event) => {
          setPokemonName(event.target.value)
        }}
        value={pokemonName.toLowerCase()}>
        </input>
        <button onClick={searchPokemon}>Search</button>
      </div>
      {loading === true ? <h1>Loading...</h1> : 
      null}
      {error === false && pokemonChosen && loading === false && (
      <div className="data">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>Number: #{pokemon.number}</h3>
        <h3>Species: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h4>Hp: {pokemon.hp}</h4>
        <h4>Attack: {pokemon.attack}</h4>
        <h4>Defense: {pokemon.defense}</h4>
        <h4>Speed: {pokemon.speed}</h4>
      </div>
      )}
      {error === true && !pokemonChosen && loading === false && (
        <h1>Pokemon not found</h1>
      )}
    </div>
  );
}

export default App;
