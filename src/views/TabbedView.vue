<template>
  <div id="tabbed-page" class="container">
    <section class="tabs">
      <tab
        v-for="tab in tabs"
        :key="tab.name"
        :tab="tab"
        @tab-clicked="getTabItem(tab)"
        v-model:activeTab="activeTab"
      />
    </section>
    <section v-if="!loading" class="tab-item">
      <tab-item :item="pokemon" :columns="pokemonAbilities" v-if="pokemon" />
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
import Tab from "@/components/shared/Tab.vue";

export default {
  name: "TabbedView",
  components: {
    Tab,
    TabItem: defineAsyncComponent(() =>
      import("@/components/shared/TabItem.vue")
    ),
    LoaderRound: defineAsyncComponent(() =>
      import("@/components/base/LoaderRound.vue")
    ),
  },
  setup() {
    const middlePokemon = "pikachu";
    
    const tabs = ref([
      {
        name: "charmander",
        imageSrc: require("@/assets/images/charmander.jpg"),
      },
      {
        name: middlePokemon,
        imageSrc: require("@/assets/images/pikachu.jpg"),
      },
      { name: "ditto", imageSrc: require("@/assets/images/ditto.png") },
    ]);

    const activeTab = ref(middlePokemon);

    const { loading, pokemon, pokemonAbilities, error, getPokemon } =
      usePokemons();

    onBeforeMount(async () => {
      await getPokemon("pikachu");
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
      pokemonAbilities,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  @include flex-align(space-between, center);
}
</style>
