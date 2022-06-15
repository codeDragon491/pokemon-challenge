<template>
    <div v-if="pokemon">
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
</template>

<script>
export default {
 name: "PokemonTab",
 props: {
    pokemon: {
      type: Object,
      default: null,
    }
 }
}
</script>

<style lang="scss" scoped>
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
</style>