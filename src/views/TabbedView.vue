<template>
  <div class="tab-container">
    <div class="pokemon-list">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-wrapper" @click="getPokemon(pokemon.name)">
        <img class="pokemon-image" :src="pokemon.imageSrc" alt="pokemon-image" />
      </div>
    </div>
    <div v-if="pokemon" class="pokemon-tab">
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
  </div>
</template>
<script>
import { ref, onBeforeMount } from "vue"
import usePokemon from "@/composables/usePokemons"
export default {
  name: "TabbedView",
  setup() {
    const pokemons = ref([ {name:'charmander', imageSrc: require('@/assets/images/charmander.jpg')} , {name:'pikachu', imageSrc: require('@/assets/images/pikachu.jpg')}, 
    {name:'ditto', imageSrc: require('@/assets/images/ditto.png')}])
    
    const {loading, pokemon, getPokemon,} = usePokemon()

    onBeforeMount(() => {getPokemon('pikachu')})

    return {  pokemons, loading, pokemon, getPokemon}
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
.pokemon-wrapper{
  display: flex;
  width: 100px;
  height: 100px;
  background-color: $clr-ntrl-min;
  border-radius: 9999px;
  padding: 0.5rem;
  /* margin: 1rem; */
  overflow: hidden;
  cursor: pointer;
}
.pokemon-image {
  margin: auto;
  max-width: 100%;
}
.pokemon-tab {
  width: 100%;
  min-height: 400px;
  height: auto;
  background-color: $clr-ntrl-min;
  padding: 1rem 1.5rem;
  margin: 0.5rem 0;
  border-radius: 25px;
  text-align: center;
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
  .pokemon-wrapper {
    width: 200px;
    height: 200px;
    margin: 1rem;
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
