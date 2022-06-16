import { createStore } from 'vuex'
import app from '@/helpers/axiosConfig'

const pokemons = {
  namespaced: true,
  state: {
    list: [],
    pokemon: null,
    loading: false
  },
  mutations: {
    addPokemon(state, pokemon) {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      if(pokemons){
        state.list = pokemons
      }
      state.list.unshift(pokemon)
      localStorage.setItem('pokemons', JSON.stringify(state.list))
    },
    getPokemon(state, name) {
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      if(pokemons){
        state.pokemon = pokemons.find(pokemon => pokemon.name === name)
      } else state.pokemon = state.list.find(pokemon => pokemon.name === name)
    },
    clearPokemon(state) {
      state.pokemon = null
    },
  },
  actions: {
    async getPokemon({commit}, payload) {
      const { data } = await app().get(payload)
      commit('addPokemon', data)
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
