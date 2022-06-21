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
  @include flex-align(center, center);
  @include circle;
  background-color: $clr-ntrl-min;
  padding: 0.5rem;
  margin: 1rem 0;
  overflow: hidden;
  cursor: pointer;
}
.tab-image-wrapper-overlay {
  @include overlay;
  margin: 0;
  background-color: $clr-ntrl-trn;
}
.overlay {
  background: rgba($clr-base-drk, 0.25);
}
.tab-image {
  max-width: 100%;
}
.tab-image-wrapper:nth-of-type(1) .tab-image {
  transform: scale(0.8);
}
@media screen and (min-width: 375px) {
.tab-image-wrapper, .tab-image-wrapper-overlay {
    @include circle(100, 100);
  }
}
@media screen and (min-width: 768px) {
  .tab-image-wrapper, .tab-image-wrapper-overlay {
    @include circle(150, 150);
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
    @include circle(200, 200);
  }
}
</style>