<template>
	<renderer id="vue-rendered-style-typo">
		{{cssMargin}}
	</renderer>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import Renderer from "./renderer/styles-renderer"

export default {
	components: {
		renderer: Renderer
	},
	filters: {
		minify: function (str) {
			if (!str) return '';
			return str.replace(/(\t|\r?\n)/g, '');
		}
	},
	computed: {
		cssMargin: function(){
			let scope = this;
			let styleObj = scope.cssParse(scope.params);
			styleObj.forEach(function(ele){
				let range = ele.range;

				ele.rules.forEach(function(rules){
					let parentNode;
					if (range.min !== null && range.max !== null) {
						parentNode = `.p-typo-preview.p-typo-preview--from${range.min}to${range.max}`;
					} else if (range.max !== null) {
						parentNode = `.p-typo-preview.p-typo-preview--from${range.min}to${range.max}`;
					} else if (range.min !== null) {
						parentNode = `.p-typo-preview.p-typo-preview--from${range.min}`;
					}
					rules.selector = `${parentNode} ${rules.selector}`;
				});
			});
			return scope.cssStringify(styleObj);
		},
		...mapGetters("breakpoints", ["params"]),
		...mapGetters("typoMargin", {
			cssParse: "parse",
			cssStringify: "stringify",
		}),
	}
};
</script>
