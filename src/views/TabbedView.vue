<template>
  <div class="tabbed-container container">
    <div class="pokemon-tabs">
        <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-wrapper" @click="getPokemon(pokemon.name);activePokemon = pokemon.name">
          <img class="pokemon-image" :src="pokemon.imageSrc" alt="pokemon-image" />
          <div class="pokemon-wrapper-overlay" :class="`${activePokemon !== pokemon.name && 'overlay'}`" />
      </div>
    </div>
    <div v-if="!loading" class="pokemon-tab-item tab-item">
      <pokemon-tab-item :pokemon="pokemon" v-if="pokemon"/>
      <div v-else-if="error">
        <p class="error">{{ error }}</p>
      </div>
    </div>
    <div v-else class="loader-wrapper">
      <loader-round/>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"
import usePokemons from "@/composables/usePokemons"
export default {
  name: "TabbedView",
  components: {
    PokemonTabItem: defineAsyncComponent(() =>  import('@/components/shared/PokemonTabItem.vue')),
    LoaderRound: defineAsyncComponent(() =>  import('@/components/base/LoaderRound.vue'))
  },
  setup() {
    const pokemons = ref([ {name:'charmander', imageSrc: require('@/assets/images/charmander.jpg')} , {name:'pikachu', imageSrc: require('@/assets/images/pikachu.jpg')}, 
    {name:'ditto', imageSrc: require('@/assets/images/ditto.png')}])
    const activePokemon = ref('pikachu')

    const {loading, pokemon,  error, getPokemon} = usePokemons()

    onBeforeMount(async() => {
      await getPokemon('pikachu')
      })

    return { pokemons, pokemon, loading, error, getPokemon, activePokemon}
  }
}
</script>

<style lang="scss" scoped>
.pokemon-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pokemon-wrapper, .pokemon-wrapper-overlay{
  position: relative;
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: $clr-ntrl-min;
  border-radius: 50%;
  padding: 0.5rem;
  margin: 1rem 0;
  overflow: hidden;
  cursor: pointer;
}
.pokemon-wrapper-overlay {
  position: absolute;
  top:0;
  left:0;
  margin: 0;
  background-color: transparent;
}
.overlay{
  background: $clr-base-drk-trn;
}
.pokemon-image {
  max-width: 100%;
}
.pokemon-wrapper:nth-of-type(1) .pokemon-image {
  transform: scale(0.9);
}
@media screen and (min-width: 768px) {
  .pokemon-wrapper, .pokemon-wrapper-overlay {
    width: 150px;
    height: 150px;
    margin: 1rem;
  }
  .pokemon-wrapper-overlay {
    margin: 0
  }
  .overlay {
    margin: 0;
  }
}
@media screen and (min-width: 1024px) {
  .pokemon-wrapper, .pokemon-wrapper-overlay {
    width: 200px;
    height: 200px;
  }
}
</style>
