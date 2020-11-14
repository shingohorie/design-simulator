<template>
    <div class="mod-captionText">
		<template v-if="innerModule">
			<div class="mod-captionText__inner" v-html="html" />
		</template>
		<template v-else>
			<div class="mod-captionText__inner"><slot/></div>
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
