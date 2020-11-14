<template>
	<div class="p-io">
		<div class="p-io__inner">
			<h2 class="p-io__heading">設定値の入力</h2>

			<div class="p-io__items">
				<div class="p-io__item">
					<p class="p-io__sttl">フォント設定</p>

					<inputter-font
						label="フォント設定のJSON文字列を入力"
						:currents="currentFonts"
					></inputter-font>

				</div>

				<div class="p-io__item">
					<p class="p-io__sttl">詳細設定</p>

					<inputter-general
						label="詳細設定のJSON文字列を入力"
						store="font"
						:currents="currentParams"
					></inputter-general>
				</div>
			</div>


			<h2 class="p-io__heading">設定値の出力</h2>

			<div class="p-io__items">
				<div class="p-io__item">
					<p class="p-io__sttl">フォント設定</p>

					<downloader-json
						label="JSONファイルをダウンロード"
						:data="currentFonts"
						filename="font.json"
					></downloader-json>
				</div>

				<div class="p-io__item">
					<p class="p-io__sttl">詳細設定</p>

					<downloader-json
						label="JSONファイルをダウンロード"
						:data="currentParams"
						filename="param.json"
					></downloader-json>
				</div>
			</div>


			<h2 class="p-io__heading">CSSの出力</h2>

			<div class="p-io__items">
				<div class="p-io__item">
					<p class="p-io__sttl">フォント設定</p>

					<downloader-css-font
						label="CSSファイルをダウンロード"
						filename="font.css"
					></downloader-css-font>
				</div>

				<div class="p-io__item">
					<p class="p-io__sttl">詳細設定</p>

					<downloader-css-general
						label="CSSファイルをダウンロード"
						filename="param.css"
					></downloader-css-general>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InputterFont from "@/components/page/io/inputter/inputter-font.vue"
import InputterGeneral from "@/components/page/io/inputter/inputter-general.vue"
import DownloaderJson from "@/components/page/io/downloader-json/downloader-json.vue"
import DownloaderCssFont from "@/components/page/io/downloader-css/downloader-css-font.vue"
import DownloaderCssGeneral from "@/components/page/io/downloader-css/downloader-css-general.vue"
import { mapMutations, mapActions, mapGetters  } from 'vuex'

export default {
	name: 'io',
	layout: 'default',
	head () {
		return {
			title: 'Settings',
			meta: [
				{ hid: 'description', name: 'description', content: 'Settings' }
			]
		}
	},
	data: function () {
		return {
		}
	},
	created: function() {
	},
	components: {
		'inputter-font': InputterFont,
		'inputter-general': InputterGeneral,
		'downloader-json': DownloaderJson,
		'downloader-css-font': DownloaderCssFont,
		'downloader-css-general': DownloaderCssGeneral
	},
	methods: {
	},
	computed: {
		currentFonts: function(){
			let scope = this;
			let data = scope.$store.getters["font/params"];
			return [data];
		},
		currentParams: function(){
			let scope = this;
			let data = scope.$store.getters["breakpoints/params"]
			return data;
		}
	}
}
</script>

<style lang="scss">
.p-io {
	padding-top: 74px;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 80px;

	&__inner {
		max-width: 1160px;
		margin: 0 auto;
		overflow: hidden;
	}

	&__heading {
		margin-bottom: 40px;
		font-size: 20px;
		line-height: 1.4;
		font-weight: bold;

		* + & {
			margin-top: 120px;
		}
	}

	&__sttl {
		margin-bottom: 12px;
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -20px;
	}

	&__item {
		width: calc(50% - 40px);
		margin-right: 20px;
		margin-left: 20px;
		font-size: 16px;
		line-height: 1.7;

		textarea {
			font-family: 'Roboto Mono', monospace;
			font-size: 12px;
		}
	}

	&__controllers {
		display: flex;
		margin-top: 30px;
	}

	&__controller {
		margin-right: 20px;

		button {
			&:hover {
				span {
					background: #000;
					color: #fff;
				}
			}
		}

		span {
			display: inline-block;
			min-width: 160px;
			padding: 10px 12px;
			border: 1px solid #000;
			border-radius: 100px;
			text-align: center;
			font-size: 16px;
			line-height: 1.2;
			transition: color .3s, background .3s;
		}
	}
}

@media screen and (max-width: 768px) {
	.p-io {
		&__items {
			display: block;
			margin: 0 auto -40px;
		}

		&__item {
			width: auto;
			margin-right: 0;
			margin-left: 0;
			margin-bottom: 40px;
			padding-bottom: 40px;

			&:not(:last-child) {
				border-bottom: 1px dashed #ddd;
			}
		}

		&__controllers {
			margin-top: 20px;
		}
	}
}
</style>


