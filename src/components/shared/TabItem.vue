<template>
  <div v-if="item">
    <div v-if="withImage" class="tab-item-icon-wrapper">
      <img class="tab-item-icon" :src="item.sprites.front_default" alt="image" />
    </div>
    <h1 class="tab-item-header">{{item.name}}</h1>
    <div class="tab-item-content">
      <div class="column" v-for="column in columns" :key="column.title">
        <h2>{{ column.title }}</h2>
        <div v-for="item in column.abilities" :key="item.name" class="item-wrapper">
          <img svg-inline class="icon icon-check" src="@/assets/icons/circle-check.svg" alt="circle-check" />
          <p>{{item[column.key].name}} <span v-if="column.key === 'stat'">: {{item.base_stat}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: "TabItem",
 props: {
    item: {
      type: Object,
      default: null,
    },
    columns: {
      type: Array,
      required: true,
    },
    withImage: {
      default: false,
      type: Boolean,
    }
 }
}
</script>

<style lang="scss" scoped>
.tab-item-header {
  font-size: 1.5rem;
  text-transform: capitalize;
}
.tab-item-content {
  flex-direction: column;
  @include flex-align(space-between, center);
  margin-top: 1.5rem;
  text-align: center;
  .column {
    h2 {
      font-size: 1.125rem;
      text-transform: capitalize;
    }
    .item-wrapper {
      margin: 0.5rem 0 0;
      text-transform: capitalize;
      svg {
        display: none;
      }
    }
  }
}
@media screen and (min-width: 601px) {   
  .tab-item-header {
    font-size: 2rem;
  }
  .tab-item-content {
    flex-direction: row;
    text-align: left; 
    @include flex-align(space-between);
    .column {
      h2 {
          font-size: 1.5rem;
      }
      .item-wrapper {
        display: flex;
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