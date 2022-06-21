<template>
  <div class="box loader">
  </div>
</template>

<script>
export default {
 name:  'LoaderRound',
}
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
  margin-bottom: .25em;
  vertical-align: top;
  transition: .3s color, .3s border, .3s transform, .3s opacity;
}
.loader {
	position: relative;
	&:before,
	&:after {
		content: '';
		@include square(inherit, inherit);
		border-radius: 50%;
		background-color: currentcolor;
		opacity: 0.6;
		@include overlay;
		animation: loader 2.0s infinite ease-in-out;
	}
	&:after {
		animation-delay: -1.0s;
	}
}

@keyframes loader {
	0%,
	100% {
		transform: scale(0.0);
	}
	50% {
		transform: scale(1.0);
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