<template>
  <div id="search-page" class="container">
    <div class="search-wrapper">
      <search-bar
        @query="searchPokemon"
        placeholder="Search a pokemom by name"
      />
    </div>
    <div v-if="!loading && pokemon || !loading && error" class="tab-item">
       <tab-item with-image :item="pokemon" :columns="pokemonAbilities" v-if="pokemon"/>
       <div v-else-if="error" class="error">
        {{ error }}
       </div>
    </div>
    <div v-else-if="loading" class="loader-wrapper">
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
    TabItem: defineAsyncComponent(() =>  import('@/components/shared/TabItem.vue')),
    LoaderRound: defineAsyncComponent(() =>  import('@/components/base/LoaderRound.vue')),
    SearchBar,
  },
  setup() {

    const {loading, pokemon, pokemonAbilities, error, getPokemon} = usePokemons()

    const searchPokemon = (async(searchQuery) => {
     await getPokemon(searchQuery)
    })

    return { pokemon, loading, error, getPokemon, searchPokemon, pokemonAbilities}
  }
}
</script>

<style lang="scss">
.search-wrapper {
  display: flex;
  justify-content: center;
}
</style>