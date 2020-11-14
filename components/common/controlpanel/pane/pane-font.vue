<template>
	<div class="l-setting">
		<div class="l-setting__body">
			<div class="l-setting__main">
				<p class="l-setting__secondaryHeader">フォント設定</p>

				<setting-font />

			</div>
		</div>
	</div>
</template>

<script>
import settingFont from "./setting/setting-font"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	components: {
		"setting-font": settingFont,
	}
};
</script>
