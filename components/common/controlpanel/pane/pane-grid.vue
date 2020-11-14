<template>
	<div class="l-setting">
		<div class="l-setting__body">
			<div class="l-setting__main">
				<p class="l-setting__secondaryHeader">ブレイクポイント</p>

				<setting-grid  />

			</div>
		</div>
	</div>
</template>

<script>
import settingGrid from "./setting/setting-grid"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	components: {
		"setting-grid": settingGrid
	},
	methods: {
		...mapMutations("controlpanel", ["close"]),
	},
	computed: {
		...mapGetters("breakpoints", ["params"])
	}
};
</script>

<style lang="scss">
</style>
