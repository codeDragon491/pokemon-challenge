import { ref } from 'vue'
// import store from '../store'
import app from '@/helpers/axiosConfig'

const error = ref(null)
const loading = ref(false)
const pokemons = ref(null)
const pokemon = ref(null)

const pokemonList = ['pikachu', 'ditto', 'charmander']
function filterByName(pokemon) {
  for (const pokemonName of pokemonList) {
      if (pokemon.name === pokemonName) {
        return pokemon
      }
  }
}

const getAllPokemons = async () => {
  error.value = null
  loading.value = true
  try {
    const { data } = await app().get('?limit=132')
    if (data) {
      pokemons.value = data.results.filter(filterByName)
      loading.value = false
    }
  } catch (err) {
    error.value = err
    loading.value = false
  }
}

const getPokemon = async (name) => {
    error.value = null
    loading.value = true
    try {
      const { data } = await app().get(name)
      pokemon.value = data
      loading.value = false
    } catch (err) {
      error.value = err
      loading.value = false
    }
  }

const usePokemons = () => ({
  loading, pokemon, getAllPokemons, getPokemon,
})

export default usePokemons
