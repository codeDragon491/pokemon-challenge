<template>
  <div class="search-box-wrapper">
    <input
      id="search-box"
      v-model="searchQuery"
      :placeholder="placeholder"
      @keyup.enter="search(searchQuery)"
    >
    <div
      :class="searchQuery ? 'hidden' : 'visible'"
    >
      <img
        svg-inline
        class="icon icon-search"
        alt="icon-search"
        src="@/assets/icons/search.svg"
      >
    </div>
    <div
      :class="searchQuery ? 'visible' : 'hidden'"
      @click="searchQuery = null"
    >
      <img
        svg-inline
        class="icon icon-close"
        alt="icon-close"
        src="@/assets/icons/close.svg"
      >
    </div>
  </div>
</template>
<script>
import { ref } from "vue"
export default {
  name: 'SearchBar',
  props: {
    query: {
      default: '',
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
   setup(props, context) {

    const searchQuery = ref(null)
    
    const search = (async(searchQuery) => {
    if(!searchQuery) return
      context.emit('query', searchQuery)
    })

    return { search, searchQuery}
  },
}
</script>
<style lang="scss" scoped>
.search-box-wrapper {
  position: relative;
  width: 25rem;
  padding: 0.75rem;
}
#search-box {
  font-family: $ff-base;
  width: -webkit-fill-available;
  border-radius: 1.5rem;
  border-style: none; 
  padding: 0.75rem 1rem;
  font-size: 1rem;
  &::placeholder {
    color: $clr-base-drk;
  }
}
.icon {
  position: absolute;
  right: 1rem;
  transition: opacity .5s ease-in-out;
  @include center-vertical;
  margin-right: 1rem;
  @include square;
  cursor: pointer;
}
</style>
