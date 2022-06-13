import { ref } from 'vue'
// import store from '../store'
import app from '../helpers/axiosConfig'

const error = ref(null)
const loading = ref(false)
const pokemons = ref(null)
const pokemon = ref(null)

const pokemonList = ['pikachu', 'ditto', 'charmander']
function filterByName(value) {
  for (const x of pokemonList) {
      if (value.name === x) {
        console.log(value)
        return value
      }
  }
}

const getAllPokemons = async () => {
  error.value = null
  loading.value = true
  try {
    const { data } = await app().get('?limit=132')
    if(data) {
      pokemons.value = data.results.filter(filterByName)
      console.log(pokemons.value)
    }
    loading.value = false
  } catch (err) {
    error.value = err
    // const message = await handleResponse(locale, err.response)
    // store.commit('pushError', message)
    loading.value = false
  }
}

const getPokemon = async (name) => {
    error.value = null
    loading.value = true
    try {
      const { data } = await app().get(name)
      pokemon.value = data.data
      loading.value = false
    } catch (err) {
      error.value = err
      // const message = await handleResponse(locale, err.response)
      // store.commit('pushError', message)
      loading.value = false
    }
  }

const useCategories = () => ({
  loading, pokemons, getAllPokemons, getPokemon,
})

export default useCategories
