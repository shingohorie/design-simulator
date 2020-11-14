<template>
	<div class="l-setting-grid">
		<table>
			<colgroup>
				<col><col><col><col><col><col><col><col><col><col>
			</colgroup>
			<thead>
				<tr>
					<th>範囲</th>
					<th>最大幅</th>
					<th>カラム数</th>
					<th>ガター幅</th>
					<th>外側マージン</th>
					<th>基準値</th>
					<th>&nbsp;</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(param, i) in params" :key="i">

					<td>
						<div class="c-inputterGroup">
							<template v-if="param.range.max">
								<div class="c-inputterGroup__item">
									<inputter-range
										:store-index="i"
										:store-key="keys('range', 'min')"
										:value="param.range.min"
									/>
								</div>
								<div class="c-inputterGroup__separator">&mdash;</div>
								<div class="c-inputterGroup__item">
									<inputter-range
										:store-index="i"
										:store-key="keys('range', 'max')"
										:value="param.range.max"
									/>
								</div>
							</template>
							<template v-else>
								<div class="c-inputterGroup__item">
									<inputter-range
										:store-index="i"
										:store-key="keys('range', 'min')"
										:value="param.range.min"
									/>
								</div>
								<div class="c-inputterGroup__separator">&plus;</div>
							</template>
						</div>
					</td>
					<td>
						<inputter-general
							:store-index="i"
							:store-key="keys('config', 'containerWidth')"
							:value="param.config.containerWidth"
							unit="px"
						/>
					</td>
					<td>
						<inputter-general
							:store-index="i"
							:store-key="keys('config', 'gridCols')"
							:value="param.config.gridCols"
						/>
					</td>
					<td>
						<inputter-general
							:store-index="i"
							:store-key="keys('config', 'gridGap')"
							:value="param.config.gridGap"
							unit="px"
						/>
					</td>
					<td>
						<inputter-general
							:store-index="i"
							:store-key="keys('config', 'outerMargin')"
							:value="param.config.outerMargin"
							unit="px"
						/>
					</td>
					<td>
						<inputter-general
							:store-index="i"
							:store-key="keys('config', 'magnification')"
							:value="param.config.magnification"
							unit="%"
						/>
					</td>
					<td>
						<button name="delete" class="c-button c-button--sm" @click="remove($event, i)" v-show="i < params.length-1"><span>削除</span></button>
					</td>
					<td :class="{ 'is-base': param.config.isBase }">
						<label class="c-radio">
							<input type="radio" name="basePoint" :value="i" :checked="i === basePoint" @change="changeBasePoint($event, i)"><span></span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="l-setting-grid__adder">
			<button name="add" class="c-button" @click="add"><span>新規ブレイクポイント</span></button>
			<p>( 基準値 / 100 ) × 詳細設定の値 ＝ 実際の適応値です<br>ブラウザ幅がBaseの最小値未満になるとモジュールのレイアウトが変化します</p>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import InputterGeneral from "./parts/inputter/inputter-general"
import InputterRange from "./parts/inputter/inputter-range"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	components: {
		"inputter-general": InputterGeneral,
		"inputter-range": InputterRange,
	},
	methods: {
		remove: function(e, i){
			this.$store.commit('breakpoints/removeBreakpoint', i);
		},
		add: function(){
			this.$store.commit('breakpoints/addBreakpoint');
		},
		changeBasePoint: function(e, i){
			this.$store.commit('breakpoints/changeBasePoint', i);
		},
		...mapMutations("controlpanel", ["close"])
	},
	computed: {
		keys: function() {
			return function(...args) {
				return args.join("-");
			};
		},
		...mapGetters("breakpoints", ["breakpoints", "params", "basePoint"])
	}
};
</script>

<style lang="scss">

.l-setting-grid {
	padding-left: 50px;
	font-size: 1.1rem;
	color: #A0A0A0;

	table {
		col {
			width: 120px;

			&:nth-child(1) {
				width: 210px;
			}

			&:nth-child(3){
				width:130px;
			}

			&:nth-child(9) {
				width: 70px;
			}
		}
	}

	thead {
		th {
			padding-bottom: 12px;
			text-align: left;
			font-size: 1rem;
		}
	}

	tbody {
		td {
			padding: 12px 0;

			&:nth-child(3){
				position: relative;
				padding-right: 60px;

				&:after {
					content: '';
					display: block;
					position: absolute;
					top: 0;
					right: 0;
					width: 1px;
					height: 30px;
					margin-top: 12px;
					margin-right: 30px;
					background: #666;;
				}
			}

			&.is-base {
				&:after {
					content: 'Base';
					display: inline-block;
					width: 30px;
					margin-left: 10px;
					font-size: 1.1rem;
					line-height: 15px;
					color: #A0A0A0;
					border: 1px solid #585858;
					border-radius: 2px;
					text-align: center;
				}
			}

		}
		.c-button[name="delete"] {
			min-width: 70px;
			padding: 6px 10px;
			font-size: 1.1rem;
		}
	}

	&__adder {
		display: flex;
		align-items: center;
		margin-top: 56px;
		line-height: 1.8;

		.c-button {
			margin-right: 30px;
		}
	}

}
</style>
