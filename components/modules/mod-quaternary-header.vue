<template>
    <div class="mod-quaternaryHeader">
		<template v-if="innerModule">
			<div class="mod-quaternaryHeader__inner" v-html="html" />
		</template>
		<template v-else>
			<div class="mod-quaternaryHeader__inner"><slot/></div>
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

