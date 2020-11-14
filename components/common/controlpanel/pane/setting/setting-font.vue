<template>
	<div class="l-setting-font">
		<div class="l-font-selector">
			<div class="l-font-selector__controllers">
				<table>
					<colgroup>
						<col/>
						<col />
						<col />
					</colgroup>
					<thead>
						<tr>
							<th>フォントファミリー:</th>
							<th>font-feature-settings:</th>
							<th>Yaku-Han-JP：</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<selector-font
									:choices="choices.family"
									:current="params.family"
									store-key="family"
								/>
							</td>
							<td>
								<selector-font
									:choices="choices.feature"
									:current="params.feature"
									store-key="feature"
								/>
							</td>
							<td>
								<selector-font
									:current="params.yakuhanjp"
									store-key="yakuhanjp"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="l-font-selector__appendix">
				<p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/font-feature-settings" target="_blank">font-feature-settingsについて</a></p>
				<p><a href="https://yakuhanjp.qranoko.jp/" target="_blank">Yaku-Han-JP について</a></p>
				<p><a href="https://ics.media/entry/200317/" target="_blank">2020年に最適なfont-familyの書き方</a></p>
			</div>
		</div>

		<div class="l-font-preview">
			<div class="l-font-preview__header">
				<p class="l-font-preview__heading">Preview :</p>

				<div class="l-font-preview__selector">
					<div class="c-selector">
						<div class="c-selector__input">
							<select v-model="previewFontSize">
								<option :value="value" v-for="(value, i) in sliderOption.values" :key="i">{{value}}px</option>
							</select>
						</div>
					</div>
				</div>

				<div class="l-font-preview__slider">
					<client-only>
						<range-slider
							class="slider"
							:min="sliderOption.min"
							:max="sliderOption.max"
							:step="sliderOption.step"
							v-model="previewFontSize">
						</range-slider>
					</client-only>
					<!-- <v-slider
						v-model="previewFontSize"
						:min="sliderOption.min"
						:max="sliderOption.max"
						:step="sliderOption.step"
						color="#fff"
						thumb-color="#fff"
						track-color="#515151"
						hide-details="true"
					/> -->
				</div>
			</div>

			<div class="l-font-preview__body" :style="{ 'font-size': previewFontSizeRem }">
				<p class="c-font-preview">各部位を正確に作るには時間がかかるので、当初の意図とは異なるが、巨大な人体を作ることにした。高さは約 8 フィートで、これに釣り合う体格だ。これを決断し、数か月にわたって材料を集め整理した後、作業を開始した。</p>
				<p class="c-font-preview">A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.</p>
				<p class="c-font-preview u-word-break">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>1234567890</p>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue"
import SelectorFont from "./parts/selector/selector-font"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	data: function(){
		return {
			sliderOption: {
				min: 10,
				max: 60,
				step: 2,
				values: [],
			}
		}
	},
	components: {
		"selector-font": SelectorFont
	},
	created: function(){
		let scope = this;
		let value = scope.sliderOption.min;
		while (value <= scope.sliderOption.max) {
			scope.sliderOption.values.push(value);
			value += scope.sliderOption.step;
		}
	},
	computed: {
		previewFontSize: {
			get: function(){
				return this.$store.getters["font/params"]["previewFontSize"];
			},
			set: function(val){
				let value = parseFloat(val);
				let payload = { data: [{ storeKey: "previewFontSize", value: value }] };
				this.$store.dispatch('font/updateParam', payload);
			}
		},
		previewFontSizeRem: function(value){
			let scope = this;
			return `${scope.previewFontSize/10}rem`;
		},
		...mapGetters("font", ["choices", "params"])
	}
};
</script>

<style lang="scss">

.l-font-selector {
	display: flex;
	max-width: 1180px;
	margin: 0 auto;

	&__controllers {
		table {
			col {
				&:nth-child(1) {
					width: 320px;
				}
				&:nth-child(2) {
					width: 160px;
				}
				&:nth-child(3) {
					width: 160px;
				}
			}

			thead {
				th {
					vertical-align: top;
					text-align: left;
					font-size: 1rem;
					padding: 0 40px 0 0;
				}
			}
			tbody {
				td {
					vertical-align: top;
					padding: 8px 40px 8px 0;
				}
			}
		}
	}

	&__appendix {
		font-size: 1.2rem;
		line-height: 1.6;

		p + p {
			margin-top: 10px;
		}

		a {
			color: inherit;
			text-decoration: underline;
		}
	}
}

.l-font-preview {
	margin-top: 100px;
	margin-left: auto;
	margin-right: auto;
	max-width: 1000px;
	padding: 40px 0;
	border-top: 1px solid #eeeeee;

	&__header {
		display: flex;
		align-items: center;
	}

	&__heading {
		margin-right: 150px;
		font-size: 4rem;
		font-family: 'Roboto', sans-serif;
		font-weight: 200;
	}

	&__selector {
		width: 80px;
		margin-right: 40px;
	}

	&__slider {
		width: 240px;

		.range-slider {
			width: 100%;
		}
	}

	&__body {
		display: flex;
		flex-wrap: wrap;
		margin: 40px -22px 0;

		p {
			width: calc(50% - 44px);
			margin: 0 22px 30px;
			line-height: 1.68;
		}
	}
}
</style>
