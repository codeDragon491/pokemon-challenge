<template>
  <div id="search-page" class="container">
    <section class="search-wrapper">
      <search-bar @query="searchPokemon" />
    </section>
    <section
      v-if="(!loading && pokemon) || (!loading && error)"
      class="pokemon-tab-item"
    >
      <pokemon-tab-item
        with-image
        :item="pokemon"
        :columns="pokemonColumns"
        v-if="pokemon"
      />
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
    </section>
    <section v-else-if="loading" class="loader-wrapper">
      <loader-round />
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import usePokemons from "@/composables/usePokemons";
import SearchBar from "@/components/search/SearchBar";

export default {
  name: "SearchView",
  components: {
    PokemonTabItem: defineAsyncComponent(() =>
      import("@/components/shared/PokemonTabItem.vue")
    ),
    LoaderRound: defineAsyncComponent(() =>
      import("@/components/base/LoaderRound.vue")
    ),
    SearchBar,
  },
  setup() {
    const { loading, pokemon, pokemonColumns, error, getPokemon } =
      usePokemons();

    const searchPokemon = async (searchQuery) => {
      await getPokemon(searchQuery);
    };

    return {
      pokemon,
      loading,
      error,
      getPokemon,
      searchPokemon,
      pokemonColumns,
    };
  },
};
</script>

<style lang="scss">
.search-wrapper {
  @include flex-align;
}
</style>