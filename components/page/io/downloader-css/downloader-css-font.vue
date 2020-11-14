
<script>
import cssbeautify from 'cssbeautify'
import _inputter from './_downloader-css';
import { mapMutations, mapGetters } from "vuex"

import CleanCSS from 'clean-css';

export default {
	mixins: [ _inputter ],
	methods: {
		/** @Override */
		download: function(){
			let scope = this;

			let styleObj = scope.cssParse;
			// 変換したObjectをCSSのテキストノードに変換
			let cssString = scope.cssStringify(styleObj);
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
		...mapGetters("font", {
			cssParse: "parse",
			cssStringify: "stringify",
		})
	}
}
</script>
