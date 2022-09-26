<template>
  <div class="box loader"></div>
</template>

<script>
export default {
  name: "LoaderRound",
};
</script>

<style lang="scss" scoped>
.box {
  color: $clr-ntrl-min;
  display: inline-block;
  @include square(100px, 100px);
  border-radius: 3px;
  font-size: 1.875rem;
  padding: 1em;
  position: relative;
  margin-bottom: 0.25em;
  vertical-align: top;
  transition: 0.3s color, 0.3s border, 0.3s transform, 0.3s opacity;
}
.loader {
  position: relative;
  &:before,
  &:after {
    content: "";
    @include square(inherit, inherit);
    border-radius: 50%;
    background-color: currentcolor;
    opacity: 0.6;
    @include overlay;
    animation: loader 2s infinite ease-in-out;
  }
  &:after {
    animation-delay: -1s;
  }
}

@keyframes loader {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
@media screen and (min-width: 768px) {
  .box {
    @include square(150px, 150px);
  }
}
@media screen and (min-width: 1024px) {
  .box {
    @include square(200px, 200px);
  }
}
</style>