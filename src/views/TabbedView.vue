<template>
  <div class="tab-container">
    <div class="pokemon-list">
        <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-wrapper" @click="getPokemon(pokemon.name);activePokemon = pokemon.name">
          <img class="pokemon-image" :src="pokemon.imageSrc" alt="pokemon-image" />
          <div class="pokemon-wrapper-overlay" :class="`${activePokemon !== pokemon.name && 'overlay'}`" />
      </div>
    </div>
    <div v-if="!loading" class="pokemon-tab">
      <div  v-if="pokemon">
        <h1 class="pokemon-header">{{pokemon.forms[0].name}}</h1>
        <div class="pokemon-content">
          <div class="column">
            <h2>Abilities</h2>
            <div v-for="item in pokemon.abilities" :key="item.ability.name" class="item-wrapper">
              <img svg-inline class="icon" src="@/assets/icons/circle-check.svg" alt="circle-check" />
              <p>{{item.ability.name}}</p>
            </div>
          </div>
          <div class="column">
            <h2>Moves</h2>
            <div v-for="item in pokemon.moves" :key="item.move.name" class="item-wrapper">
              <img svg-inline class="icon" src="@/assets/icons/circle-check.svg" alt="circle-check" />
              <p>{{item.move.name}}</p>
            </div>
          </div>
          <div class="column">
            <h2>Stats</h2>
            <div v-for="item in pokemon.stats" :key="item.stat.name" class="item-wrapper">
              <img svg-inline class="icon" src="@/assets/icons/circle-check.svg" alt="circle-check" />
              <p>{{item.stat.name}}: {{item.base_stat}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
    </div>
    </div>
    <div v-else class="loader-container">
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
    LoaderRound: defineAsyncComponent(() =>  import('../components/LoaderRound.vue'))
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
.tab-container {
  width: 100%;
  padding: 1rem;
}
.pokemon-list {
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
  border-radius: 9999px;
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
.pokemon-header {
  font-size: 1.5rem;
  text-transform: capitalize;
}
.pokemon-content {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  .column {
    width: min-content;
    h2 {
      font-size: 1.125rem;
    }
    .item-wrapper {
      margin-top: 0.5rem;
      text-transform: capitalize;
      display: flex;
      margin-right: 0.5rem;
      svg {
        display: none;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .tab-container {
    padding: 2rem;
  }
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
  .pokemon-header {
    font-size: 2rem;
  }
  .pokemon-content {
    .column {
      width: auto;
      h2 {
        font-size: 1.5rem;
      }
      .item-wrapper {
        margin-right: 0;
        svg {
          margin-right: 0.25rem;
          display: block;
        }
    }
  }
}
}
@media screen and (min-width: 1024px) {
  .tab-container {
    padding: 3rem;
  }
  .pokemon-wrapper, .pokemon-wrapper-overlay {
    width: 200px;
    height: 200px;
  }
}
@media screen and (min-width: 1280px) {
  .tab-container {
    width: 70%;
  }
}
@media screen and (min-width: 1920px) {
  .tab-container {
    width: 60%;
  }
}
</style>
