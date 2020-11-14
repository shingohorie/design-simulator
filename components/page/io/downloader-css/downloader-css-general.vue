
<script>
import _inputter from './_downloader-css';
import { mapMutations, mapGetters } from "vuex"

import _cssModuleLayoutGeneral from '!!css-loader!sass-loader!@/assets/scss/_modules_general.scss';
import _cssModuleLayoutPc from '!!css-loader!sass-loader!@/assets/scss/_modules_only_pc.scss';
import _cssModuleLayoutSp from '!!css-loader!sass-loader!@/assets/scss/_modules_only_sp.scss';

import CleanCSS from 'clean-css';

export default {
	mixins: [ _inputter ],
	data: function() {
		return {
			cssModuleLayoutGeneral: _cssModuleLayoutGeneral.toString(),
			cssModuleLayoutPc: _cssModuleLayoutPc.toString(),
			cssModuleLayoutSp: _cssModuleLayoutSp.toString()
		}
	},
	methods: {
		/** @Override */
		download: function(){
			let scope = this;
			let cssString = scope.cssModuleLayoutGeneral;

			if (scope.basePoint === 0) {
				cssString += `@media screen and (min-width: ${ scope.params[scope.basePoint].range.max+1}px) { ${ scope.cssModuleLayoutPc } }`;
				cssString += `@media screen and (max-width: ${ scope.params[scope.basePoint].range.max}px) { ${ scope.cssModuleLayoutSp } }`;
			} else {
				cssString += `@media screen and (min-width: ${ scope.params[scope.basePoint].range.min}px) { ${ scope.cssModuleLayoutPc } }`;
				cssString += `@media screen and (max-width: ${ scope.params[scope.basePoint].range.min-1}px) { ${ scope.cssModuleLayoutSp } }`;
			}

			let styleObj = scope.cssParse(scope.params);
			// 変換したObjectをCSSのテキストノードに変換
			let _cssString = scope.cssStringify(styleObj);

			cssString += _cssString

			// 整形
			let formattedCssString = new CleanCSS({
				format: 'keep-breaks',
				level: 2
			}).minify(cssString);

			let blob = new Blob([formattedCssString.styles], { "type": "text/plain" });
			let url = window.URL.createObjectURL(blob);
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = scope.filename;
			link.click();
		}
	},
	computed: {
		...mapGetters("breakpoints", {
			params: "params",
			basePoint: "basePoint",
			cssParse: "parse",
			cssStringify: "stringify",
		})
	}
}
</script>
