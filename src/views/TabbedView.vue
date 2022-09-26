<template>
  <div id="tabbed-page" class="container">
    <section class="pokemon-tabs">
      <pokemon-tab
        v-for="tab in tabs"
        :key="tab.name"
        :tab="tab"
        @tab-clicked="getTabItem(tab)"
        v-model:activeTab="activeTab"
      />
    </section>
    <section v-if="!loading" class="pokemon-tab-item">
      <pokemon-tab-item
        :item="pokemon"
        :columns="pokemonColumns"
        v-if="pokemon"
      />
      <div v-else-if="error">
        <p class="error">{{ error }}</p>
      </div>
    </section>
    <section v-else class="loader-wrapper">
      <loader-round />
    </section>
  </div>
</template>
<script>
import { ref, onBeforeMount, defineAsyncComponent } from "vue";
import usePokemons from "@/composables/usePokemons";
import PokemonTab from "@/components/tabs/PokemonTab.vue";

export default {
  name: "TabbedView",
  components: {
    PokemonTab,
    PokemonTabItem: defineAsyncComponent(() =>
      import("@/components/shared/PokemonTabItem.vue")
    ),
    LoaderRound: defineAsyncComponent(() =>
      import("@/components/base/LoaderRound.vue")
    ),
  },
  setup() {
    const activeTab = ref("pikachu");

    const tabs = ref([
      {
        name: "charmander",
        imageSrc: require("@/assets/images/charmander.jpg"),
      },
      {
        name: activeTab.value,
        imageSrc: require("@/assets/images/pikachu.jpg"),
      },
      { name: "ditto", imageSrc: require("@/assets/images/ditto.png") },
    ]);

    const { loading, pokemon, pokemonColumns, error, getPokemon } =
      usePokemons();

    onBeforeMount(async () => {
      await getPokemon(activeTab.value);
    });

    const getTabItem = async (tab) => {
      activeTab.value = tab.name;
      await getPokemon(tab.name);
    };
    return {
      tabs,
      pokemon,
      loading,
      error,
      getTabItem,
      activeTab,
      pokemonColumns,
    };
  },
};
</script>

<style lang="scss" scoped>
.pokemon-tabs {
  @include flex-align(space-between, center);
}
</style>
