<template>
	<div class="l-splash" :class="{ 'is-loaded': isLoaded }"></div>
</template>

<script>
export default {
	data: function() {
		return {
			isLoaded: false
		};
	},
	created: function() {
		let scope = this;
		if (!scope.isLoaded) setTimeout(() =>  {scope.isLoaded = true; }, 0);
	}
};
</script>

<style lang="scss" scoped>
.l-splash {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100vw;
	height: 100vh;
	background: #fff;
	opacity: 1;
	visibility: visible;
	pointer-events: auto;

	&.is-loaded {
		opacity: 0;
		pointer-events: none;
		transition: all 0s linear 0s, opacity 0.2s linear 0.1s;
	}
}
</style>
