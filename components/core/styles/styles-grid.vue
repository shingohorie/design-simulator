<template>
	<renderer id="vue-rendered-style-grid">
		{{ cssGrid }}
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
		cssGrid: function(){
			let scope = this;

			// Storeで保持している情報をCSSとして出力できるObjectに変換
			let styleObj = scope.cssParse(scope.params);
			// 変換したObjectをCSSのテキストノードに変換。コールバック関数でデフォルトのセレクタ（body）を変更
			styleObj.forEach(function(ele){
				let range = ele.range;

				ele.rules.forEach(function(rules){
					rules.selector = `.p-layout-preview ${rules.selector}`;
				});
			});
			return scope.cssStringify(styleObj);
		},
		...mapGetters("breakpoints", ["params", "basePoint"]),
		...mapGetters("grid", {
			cssParse: "parse",
			cssStringify: "stringify",
		}),
	}
};
</script>
