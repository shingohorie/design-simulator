<template>
	<div class="l-wrapper">

		<core-styles-font />
		<core-styles-module />
		<core-styles-typo />
		<core-styles-grid />

		<common-header />

		<main class="l-main">
			<div class="l-main__inner">
				<nuxt />
			</div>
		</main>

		<common-controlpanel />

		<common-splash />
	</div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex"
import CommonSplash from "@/components/common/splash/splash"
import CommonHeader from "@/components/common/header/header"
import CommonControlPanel from "@/components/common/controlpanel/controlpanel"
import CoreStylesFont from "@/components/core/styles/styles-font"
import CoreStylesModule from "@/components/core/styles/styles-module"
import CoreStylesTypo from "@/components/core/styles/styles-typo"
import CoreStylesGrid from "@/components/core/styles/styles-grid"

export default {
	components: {
		"common-splash": CommonSplash,
		"common-header": CommonHeader,
		"common-controlpanel": CommonControlPanel,
		"core-styles-font": CoreStylesFont,
		"core-styles-module": CoreStylesModule,
		"core-styles-typo": CoreStylesTypo,
		"core-styles-grid": CoreStylesGrid
	},
	methods: {
		...mapActions("breakpoints", ["getDefaultParams"])
	}
};
</script>
