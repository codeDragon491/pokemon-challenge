<template>
  <div class="search-container container">
    <div class="search-wrapper">
      <search-bar
        @query="searchPokemon"
        placeholder="Search a pokemom by name"
      />
    </div>
    <div v-if="!loading && pokemon || !loading && error" class="pokemon-tab">
       <pokemon-tab :pokemon="pokemon   " v-if="pokemon"/>
       <div v-else-if="error" class="error">
        {{ error }}
       </div>
    </div>
    <div v-else-if="loading" class="loader-container">
      <loader-round/>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue"
import usePokemons from "@/composables/usePokemons"
import SearchBar from "@/components/search/SearchBar"
export default {
  name: 'SearchView',
  components: {
    PokemonTab: defineAsyncComponent(() =>  import('@/components/shared/PokemonTab.vue')),
    LoaderRound: defineAsyncComponent(() =>  import('@/components/base/LoaderRound.vue')),
    SearchBar,
  },
  setup() {
    const {loading, pokemon,  error, getPokemon} = usePokemons()

    const searchPokemon = (async(searchQuery) => {
    console.log(searchQuery)
     await getPokemon(searchQuery)
    })

    return { pokemon, loading, error, getPokemon, searchPokemon}
  }
}
</script>

<style lang="scss">
.search-wrapper {
  display: flex;
  justify-content: center;
}
.pokemon-tab, .loader-container {
  width: 100%;
  min-height: 400px;
  height: auto;
  background-color: $clr-ntrl-min;
  padding: 1rem 1.5rem;
  margin: 0.5rem 0;
  border-radius: 25px;
  text-align: center;
}
.loader-container {
   background-color: transparent;
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>