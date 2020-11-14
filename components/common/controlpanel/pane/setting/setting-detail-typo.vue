<template>
	<div class="l-setting-typo">
		<div class="l-setting-typo__general">
			<table>
				<colgroup>
					<col><col><col><col><col>
				</colgroup>
				<thead>
					<tr>
						<th>フォントサイズ：</th>
						<th>ジャンプ率：</th>
						<th>行間（L）：</th>
						<th>行間（S）：</th>
						<th>字間：</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-for="(d, i) in dataGeneral" :key="i">
							<inputter-general
								:store-index="index"
								:store-key="d.key"
								:value="d.value"
								:unit="d.unit"
								:note="d.note"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="l-setting-typo__module">
			<table>
				<colgroup>
					<col><col><col><col><col>
				</colgroup>
				<thead>
					<tr>
						<th>&nbsp;</th>
						<th>フォントサイズ：</th>
						<th>行間：</th>
						<th>下マージン：</th>
						<th>字間：</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(d, i) in dataModules" :key="i">
						<th>{{ d.title }}</th>

						<td>
							<template v-if="d.param.fontSize !== void 0">
								<inputter-general
								:store-index="index"
								:store-key="keys('modules', d.ele, 'fontSize')"
								:value="d.param.fontSize"
								unit="px"
								/>
							</template>
							<template v-else>&nbsp;</template>
						</td>

						<td>
							<template v-if="d.param.lineHeightRate !== void 0">
								<div class="with-actual-amount">
								<inputter-general
									:store-index="index"
									:store-key="keys('modules', d.ele, 'lineHeightRate')"
									:value="d.param.lineHeightRate"
									unit="％"
								/>
								<span
									class="actual-ammount"
								>({{ d.param.fontSize * (d.param.lineHeightRate / 100) | fixed }} px)</span>
								</div>
							</template>
							<template v-else>&nbsp;</template>
						</td>

						<td>
							<template v-if="d.param.marginBottom !== void 0">
								<inputter-general
								:store-index="index"
								:store-key="keys('modules', d.ele, 'marginBottom')"
								:value="d.param.marginBottom"
								unit="px"
								/>
							</template>
							<template v-else>&nbsp;</template>
						</td>

						<td>
							<template v-if="d.param.letterSpacing !== void 0">
								<inputter-general
								:store-index="index"
								:store-key="keys('modules', d.ele, 'letterSpacing')"
								:value="d.param.letterSpacing"
								unit="px"
								/>
							</template>
							<template v-else>&nbsp;</template>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import InputterGeneral from "./parts/inputter/inputter-general"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	props: ["param", "index"],
	components: {
		"inputter-general": InputterGeneral
	},
	computed: {
		keys: function() {
			return function(...args) {
				return args.join("-");
			};
		},
		dataGeneral: function(){
			let scope = this;
			let param = scope.params[scope.index];
			return [
				{
					key: 'modules-base-fontSize',
					value: param.modules.base.fontSize,
					unit: 'px'
				},
				{
					key: 'modules-base-jumpRate',
					value: param.modules.base.jumpRate,
					unit: '%'
				},
				{
					key: 'modules-regular-lineHeightRate',
					value: param.modules.regular.lineHeightRate,
					unit: '%',
					note: '本文用'
				},
				{
					key: 'modules-button-lineHeightRate',
					value: param.modules.button.lineHeightRate,
					unit: '%',
					note: 'ボタン等に使用'
				},
				{
					key: 'modules-regular-letterSpacing',
					value: param.modules.regular.letterSpacing,
					unit: 'px'
				},
			]
		},
		dataModules: function(){
			let scope = this;
			let param = scope.params[scope.index];
			return [
				{
					title: "H1",
					param: param.modules.h1,
					ele: "h1"
				},
				{
					title: "H2",
					param: param.modules.h2,
					ele: "h2"
				},
				{
					title: "H3",
					param: param.modules.h3,
					ele: "h3"
				},
				{
					title: "H4",
					param: param.modules.h4,
					ele: "h4"
				},
				{
					title: "リード (H4相当)",
					param: param.modules.lead,
					ele: "lead"
				},
				{
					title: "本文",
					param: param.modules.regular,
					ele: "regular"
				},
				{
					title: "キャプション",
					param: param.modules.caption,
					ele: "caption"
				},
				{
					title: "注釈",
					param: param.modules.note,
					ele: "note"
				},
				{
					title: "ボタン",
					param: param.modules.button,
					ele: "button"
				},
				{
					title: "画像",
					param: param.modules.visual,
					ele: "visual"
				}
			]
		},
		...mapGetters("breakpoints", ["params"])
	},
	filters: {
		fixed: function(value) {
			return Math.round(value * 10) / 10;
		}
	}
};
</script>

<style lang="scss">
.l-setting-typo {
	padding-left: 50px;
	font-size: 1.1rem;
	color: #A0A0A0;

	table {
		col {
			width: 150px;
		}
	}

	&__general {
		thead {
			th {
				vertical-align: top;
				text-align: left;
				font-size: 1rem;
			}
		}

		tbody {
			td {
				vertical-align: top;
			}
		}
	}

	&__module {
		margin-top: 30px;

		thead {
			th {
				vertical-align: top;
				text-align: left;
				font-size: 1rem;
			}
		}

		tbody {
			th {
				vertical-align: top;
				padding: 18px 25px 8px 0;
				text-align: right;
				font-size: 1.2rem;
				font-weight: normal;
			}

			td {
				vertical-align: top;
				padding: 8px 15px 8px 0;
			}
		}
	}
}

.with-actual-amount {
	display: flex;
	align-items: flex-end;

	.actual-ammount {
		margin-left: 5px;
		font-size: 1.1rem;
		color: #A0A0A0;
		white-space: nowrap;
	}
}
</style>
