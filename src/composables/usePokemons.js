import { ref, computed } from 'vue'
import store from '../store'
import app from '@/helpers/axiosConfig'

const error = ref(null)
const loading = ref(false)
const pokemons = ref(null)

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
    error.value = 'Something went wrong. Try again later!'
    loading.value = false
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPokemon = async (name) => {
    error.value = null
    loading.value = true
    try {
      if(localStorage.getItem('pokemons')) {
        const pokemons = JSON.parse(localStorage.getItem('pokemons'))
        const pokemonIsLoaded  = pokemons.some(pokemon => pokemon.forms[0].name === name)
        if (pokemonIsLoaded) {
          store.commit('pokemons/getPokemon', name)
        } else {
          await store.dispatch('pokemons/getPokemon', name)
          store.commit('pokemons/getPokemon', name)
        }
      } else {
        await store.dispatch('pokemons/getPokemon', name)
        store.commit('pokemons/getPokemon', name)
      }
      await sleep(1000)
      loading.value = false
    } catch (err) {
      error.value = 'Something went wrong. Try again later'
      await sleep(1000)
      loading.value = false
    }
  }

  const pokemon = computed(() => store.state.pokemons.pokemon)


const usePokemons = () => ({
  loading, pokemon, error, getPokemon, getAllPokemons,
})

export default usePokemons
