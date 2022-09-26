import { createStore } from 'vuex'
import app from '@/helpers/axiosConfig'

const pokemons = {
  namespaced: true,
  state: {
    list: JSON.parse(localStorage.getItem('pokemons')) ? JSON.parse(localStorage.getItem('pokemons')) : [],
    pokemon: null,
    columns: [],
  },
  mutations: {
    addPokemon(state, pokemon) {
      state.list.unshift(pokemon)
      localStorage.setItem('pokemons', JSON.stringify(state.list))
    },
    getPokemon(state, name) {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      if (pokemons) {
        state.pokemon = pokemons.find(pokemon => pokemon.name === name)
      } else state.pokemon = state.list.find(pokemon => pokemon.name === name)
      state.columns = [
        { title: 'abilities', sub_column: state.pokemon.abilities, key: 'ability' },
        { title: 'moves', sub_column: state.pokemon.moves, key: 'move' },
        { title: 'stats', sub_column: state.pokemon.stats, key: 'stat' }
      ]
    },
    clearPokemon(state) {
      state.pokemon = null
      state.colums = []
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
