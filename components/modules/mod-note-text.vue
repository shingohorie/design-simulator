<template>
    <div class="mod-noteText">
		<template v-if="innerModule">
			<div class="mod-noteText__inner" v-html="html" />
		</template>
		<template v-else>
			<div class="mod-noteText__inner"><slot/></div>
		</template>
	</div>
</template>

<script>
export default {
	props: ['innerModule'],
	data: function () {
		return {
			html: this.$slots.default[0].text
		}
	}
}
</script>
