import { createStore } from 'vuex'
import app from '@/helpers/axiosConfig'

const pokemons = {
  namespaced: true,
  state: {
    list: [],
    pokemon: null,
    abilities: [],
  },
  mutations: {
    addPokemon(state, pokemon) {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      if (pokemons) {
        state.list = pokemons
      }
      state.list.unshift(pokemon)
      localStorage.setItem('pokemons', JSON.stringify(state.list))
    },
    getPokemon(state, name) {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      if (pokemons) {
        state.pokemon = pokemons.find(pokemon => pokemon.name === name)
      } else state.pokemon = state.list.find(pokemon => pokemon.name === name)
      state.abilities = [
        { title: 'abilities', abilities: state.pokemon.abilities, key: 'ability' },
        { title: 'moves', abilities: state.pokemon.moves, key: 'move' },
        { title: 'stats', abilities: state.pokemon.stats, key: 'stat' }
      ]
    },
    clearPokemon(state) {
      state.pokemon = null
      state.abilities = []
    },
  },
  actions: {
    async getPokemon({ commit }, payload) {
      const { data } = await app().get(payload)
      commit('addPokemon', data)
      commit('getPokemon', payload)
    }
  },
}

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokemons
  }
})
