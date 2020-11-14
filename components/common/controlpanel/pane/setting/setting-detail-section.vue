<template>
	<div class="l-setting-section">
		<div class="l-setting-section__general">
			<table>
				<colgroup>
					<col><col><col><col>
				</colgroup>
				<thead>
					<tr>
						<th>L</th>
						<th>M</th>
						<th>S</th>
						<th>List</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-for="(d, i) in dataSection" :key="i">
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
		dataSection: function(){
			let scope = this;
			let param = scope.params[scope.index];
			return [
				{
					key: 'sectionMargin-L',
					value: param.sectionMargin.L,
					unit: 'px',
					note: 'H2セクションで使用'
				},
				{
					key: 'sectionMargin-M',
					value: param.sectionMargin.M,
					unit: 'px',
					note: 'H3セクションで使用'
				},
				{
					key: 'sectionMargin-S',
					value: param.sectionMargin.S,
					unit: 'px',
					note: 'H4セクションで使用'
				},
				{
					key: 'sectionMargin-XS',
					value: param.sectionMargin.XS,
					unit: 'px'
				}
			]
		},
		...mapGetters("breakpoints", ["params"])
	}
};
</script>

<style lang="scss">
.l-setting-section {
	padding-left: 50px;
	font-size: 1.1rem;
	color: #A0A0A0;

	table {
		col {
			width: 150px;
		}
	}

	&__general {
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
				vertical-align: top;
				font-weight: normal;
			}

			td {
				vertical-align: top;
				padding: 8px 25px 8px 0;
			}
		}
	}
}
</style>
