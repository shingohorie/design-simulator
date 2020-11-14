<template>
	<renderer id="vue-rendered-style-module">
		{{ cssModulesGeneral | minify }}
		{{ cssModules }}
	</renderer>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import Renderer from "./renderer/styles-renderer"

import _cssModuleLayoutGeneral from '!!css-loader!sass-loader!@/assets/scss/_modules_general.scss';
import _cssModuleLayoutPc from '!!css-loader!sass-loader!@/assets/scss/_modules_only_pc.scss';
import _cssModuleLayoutSp from '!!css-loader!sass-loader!@/assets/scss/_modules_only_sp.scss';

export default {
	data: function() {
		return {
			cssModuleLayoutGeneral: _cssModuleLayoutGeneral.toString(),
			cssModuleLayoutPc: _cssModuleLayoutPc.toString(),
			cssModuleLayoutSp: _cssModuleLayoutSp.toString()
		}
	},
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
		cssModulesGeneral: function(){
			let scope = this;

			let cssString = scope.cssModuleLayoutGeneral;

			if (scope.basePoint === 0) {
				cssString += `@media screen and (min-width: ${ scope.params[scope.basePoint].range.max+1}px) { ${ scope.cssModuleLayoutPc } }`;
				cssString += `@media screen and (max-width: ${ scope.params[scope.basePoint].range.max}px) { ${ scope.cssModuleLayoutSp } }`;
			} else {
				cssString += `@media screen and (min-width: ${ scope.params[scope.basePoint].range.min}px) { ${ scope.cssModuleLayoutPc } }`;
				cssString += `@media screen and (max-width: ${ scope.params[scope.basePoint].range.min-1}px) { ${ scope.cssModuleLayoutSp } }`;
			}

			return cssString;
		},
		cssModules: function(){
			let scope = this;
			// Storeで保持している情報をCSSとして出力できるObjectに変換
			let styleObj = scope.cssParse(scope.params);

			// デフォルトのセレクタに親要素を追加
			styleObj.forEach(function(ele){
				let range = ele.range;

				ele.rules.forEach(function(rules){
					rules.selector = `.p-layout-preview ${rules.selector}`;
				});
			});

			// 変換したObjectをCSSのテキストノードに変換
			return scope.cssStringify(styleObj);
		},
		...mapGetters("breakpoints", {
			params: "params",
			basePoint: "basePoint",
			cssParse: "parse",
			cssStringify: "stringify",
		}),
	}
};
</script>
