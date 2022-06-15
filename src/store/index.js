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
      state.list.unshift(pokemon)
      localStorage.setItem('pokemons', JSON.stringify(state.list))
    },
    getPokemon(state, name) {
      if(localStorage.getItem('pokemons')){
      const pokemons = JSON.parse(localStorage.getItem('pokemons'))
      state.pokemon = pokemons.find(pokemon => pokemon.forms[0].name === name)
      } else state.pokemon = state.list.find(pokemon => pokemon.forms[0].name === name)
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
