<template>
	<div class="mod-leadText">
		<div class="mod-leadText__inner" v-html="html" />
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			html: this.$slots.default[0].text
		}
	}
}
</script>
