<template>
	<div class="mod-media-v2" :class="[directionClass]">
		<div class="mod-media-v2__inner">
			<div class="mod-media-v2__vis" v-if="imageSrc">
				<img :src="imageSrc" alt />
			</div>
			<div class="mod-media-v2__detail">
				<div class="mod-media-v2__texts">
					<template v-if="heading">
						<mod-lead-text>{{heading}}</mod-lead-text>
					</template>
					<template v-if="texts">
						<texts-renderer v-for="(item, index) in texts" :el="item.el" :key="index">{{item.text}}</texts-renderer>
					</template>
				</div>
				<div class="mod-media-v2__toDetail" v-if="buttonText">
					<mod-button :href="buttonHref" :target="buttonTarget">{{buttonText}}</mod-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TextsRenderer from "@/components/modules/texts-renderer";

export default {
	props: [ "heading", "imageSrc", "texts", "buttonHref", "buttonText", "buttonTarget", "direction" ],
	components: {
		"texts-renderer": TextsRenderer
	},
	computed: {
		directionClass: function() {
			let scope = this;
			if (scope.direction !== void 0) {
				return 'mod-media-v2--' + scope.direction;
			} else {
				return '';
			}
		}
	}
};
</script>
