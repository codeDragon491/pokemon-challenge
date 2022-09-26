import { ref, computed } from 'vue'
import store from '@/store'

const error = ref(null)
const loading = ref(false)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPokemon = async (name) => {
  error.value = null
  loading.value = true
  store.commit('pokemons/clearPokemon')
  try {
    if (pokemons.value.length) {
      const pokemonIsLoaded = pokemons.value.some(pokemon => pokemon.name === name)
      if (pokemonIsLoaded) {
        store.commit('pokemons/getPokemon', name)
      } else {
        await store.dispatch('pokemons/getPokemon', name)
      }
    } else {
      await store.dispatch('pokemons/getPokemon', name)
    }
    await sleep(1000)
    loading.value = false
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data
    } else error.value = 'Something went wrong. Try again later'
    await sleep(1000)
    loading.value = false
  }
}

const pokemons = computed(() => store.state.pokemons.list)

const pokemon = computed(() => store.state.pokemons.pokemon)

const pokemonColumns = computed(() => store.state.pokemons.columns)


const usePokemons = () => ({
  loading, pokemon, pokemonColumns, error, getPokemon,
})

export default usePokemons
