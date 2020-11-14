<template>
	<renderer id="vue-rendered-style-font">
		{{ cssFont | minify }}
	</renderer>
</template>

<script>
import { cloneDeep } from 'lodash'
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
		cssFont: function(){
			let scope = this;

			// Storeで保持している情報をCSSとして出力できるObjectに変換
			let styleObj = scope.cssParse;
			// デフォルトのセレクタ（body）を変更
			styleObj.forEach(function(ele){
				ele.rules.forEach(function(rules){
					rules.selector = '.p-layout-preview, .c-font-preview';
				});
			});
			// 変換したObjectをCSSのテキストノードに変換
			let styleTextNode = scope.cssStringify(styleObj);

			return styleTextNode;
		},
		...mapGetters("breakpoints", ["params", "basePoint"]),
		...mapGetters("font", {
			cssParse: "parse",
			cssStringify: "stringify",
		}),
	}
};
</script>
