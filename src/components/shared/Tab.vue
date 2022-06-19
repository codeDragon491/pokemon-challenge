<template>
   <div class="tab-image-wrapper" @click="$emit('tab-clicked')">
    <img class="tab-image" :src="tab.imageSrc" alt="image" />
    <div class="tab-image-wrapper-overlay" :class="`${activeTab !== tab.name && 'overlay'}`" />
   </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tab',
  props: {
    tab: {
      type: Object,
      default: null,
    },
    activeTab: {
      type: String,
      default: '',
    },
 }
}
</script>

<style lang="scss" scoped>
.tab-image-wrapper, .tab-image-wrapper-overlay{
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
.tab-image-wrapper-overlay {
  position: absolute;
  top:0;
  left:0;
  margin: 0;
  background-color: transparent;
}
.overlay{
  background: $clr-base-drk-trn;
}
.tab-image {
  max-width: 100%;
}
.tab-image-wrapper:nth-of-type(1) .tab-image {
  transform: scale(0.9);
}
@media screen and (min-width: 768px) {
  .tab-image-wrapper, .tab-image-wrapper-overlay {
    width: 150px;
    height: 150px;
    margin: 1rem;
  }
  .tab-image-wrapper-overlay {
    margin: 0
  }
  .overlay {
    margin: 0;
  }
}
@media screen and (min-width: 1024px) {
  .tab-image-wrapper, .tab-image-wrapper-overlay {
    width: 200px;
    height: 200px;
  }
}
</style>