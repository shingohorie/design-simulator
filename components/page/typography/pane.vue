<template>
	<div class="p-typo-preview" :class="rangeClass">
		<table>
			<colgroup>
				<col width="70px" />
				<col width="85px" />
				<col width="85px" />
				<col width="85px" />
				<col width="460px"/>
			</colgroup>
			<thead>
				<tr>
					<th>&nbsp;</th>
					<th>font-size</th>
					<th>line-hight</th>
					<th>margin-bottom</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(d, i) in dataModules">
					<template v-if="d.el !== 'button'">
						<row-module :el="d.el" :param="d.param" :title="d.title" :config="d.config" :key="i+'-module'">{{ d.text }}</row-module>
						<row-margin :el="d.el" :param="d.param" :key="i+'-margin'" />
						<row-blank />
					</template>
					<template v-else>
						<row-margin :el="d.el" :param="d.param" :key="i+'-margin'" />
						<row-module :el="d.el" :param="d.param" :title="d.title" :config="d.config" :key="i+'-module'">{{ d.text }}</row-module>
						<row-blank />
					</template>
				</template>

			</tbody>
		</table>
	</div>
</template>

<script>
import RowModule from "./row/row-module"
import RowMargin from "./row/row-margin"
import RowBlank from "./row/row-blank"

export default {
	props: ["param", "index"],
	data: function() {
		return {
			dataModules: [
				{
					el: "h1",
					title: "H1",
					param: this.param.modules.h1,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "h2",
					title: "H2",
					param: this.param.modules.h2,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "h3",
					title: "H3",
					param: this.param.modules.h3,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "h4",
					title: "H4",
					param: this.param.modules.h4,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "lead",
					title: "リード (H4相当)",
					param: this.param.modules.lead,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "regular",
					title: "本文",
					param: this.param.modules.regular,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "caption",
					title: "キャプション",
					param: this.param.modules.caption,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "note",
					title: "注釈",
					param: this.param.modules.note,
					text: "Type something",
					config: this.param.config
				},
				{
					el: "button",
					title: "ボタン",
					param: this.param.modules.button,
					text: "Type something",
					config: this.param.config
				}
			]
		};
	},
	components: {
		"row-module": RowModule,
		"row-margin": RowMargin,
		"row-blank": RowBlank
	},
	computed: {
		rangeClass: function(){
			if (this.param.range.max) {
				return `p-typo-preview--from${this.param.range.min}to${this.param.range.max}`;
			} else {
				return `p-typo-preview--from${this.param.range.min}`;
			}
		}
	}
};
</script>

<style lang="scss">
.p-typo-preview {
	max-width: 1024px;
	margin: 0 auto 80px;

	table {
		width: 100%;
		margin: 0;
		border-collapse: collapse;
		text-align: right;
		white-space: nowrap;
	}

	thead th {
		padding-left: 30px;
		padding-right: 10px;
		padding-bottom: 5px;
		font-size: 13px;
		border-right: 1px solid #000;
		font-family: "Noto Sans JP","Hiragino Kaku Gothic ProN","ヒラギノ角ゴ ProN",YuGothic,"游ゴシック",Meiryo,"メイリオ",sans-serif;
		font-weight: normal;

		&:first-child,
		&:nth-last-child(2),
		&:last-child {
			border-right: none;
		}
	}

	tbody {
		tr.p-row-module {
			td:last-child {
				position: relative;
				padding-bottom: 0;
				vertical-align: bottom !important;

				> * {
					margin-top: 0 !important;
					margin-bottom: 0 !important;
				}
			}

			&.button {
				th, td {
					height: auto;
					padding-top: 0;
				}
			}
		}

		tr.p-row-margin {
			th, td {
				padding: 0;
				font-size: 0;
				border-bottom: none;
			}

			td:last-child {
				padding-top: 0;
				padding-bottom: 0;
				padding-right: 40px;
				padding-left: 30px;
			}

			&.button {
				th, td {
					padding-top: 40px;
				}
			}
		}

		tr.p-row-blank {
			th, td {
				padding: 0;
				border: none;
				font-size: 0;
				line-height: 0;
			}
		}

		tr.p-row-module:first-of-type {
			td:last-child {
				padding-top: 0;
			}
		}

		th {
			vertical-align: bottom;
			padding-top: 40px;
			padding-right: 5px;
			padding-bottom: 5px;
			border-bottom: 1px solid #000;
			font-size: 16px;
			font-weight: normal;
			text-align: left;
		}

		td {
			vertical-align: bottom;
			padding-top: 40px;
			padding-left: 30px;
			padding-right: 10px;
			padding-bottom: 5px;
			border-bottom: 1px solid #000;
			border-right: 1px solid #000;
			font-size: 16px;

			&:nth-last-child(2) {
				border-right: none;
			}

			&:last-child {
				border-right: none;
				vertical-align: top;
				border-bottom: none;
				text-align: left;
				padding-right: 40px;
			}
		}
	}

	.mod-primaryHeader, .mod-secondaryHeader, .mod-tertiaryHeader, .mod-quaternaryHeader, .mod-leadText, .mod-regularText, .mod-captionText, .mod-noteText {
		padding-left: 0!important;
		padding-right: 0!important;
	}

	.mod-primaryHeader,
	.mod-secondaryHeader,
	.mod-tertiaryHeader,
	.mod-quaternaryHeader,
	.mod-leadText,
	.mod-regularText,
	.mod-captionText,
	.mod-noteText {
		position: relative;
		background-repeat: no-repeat, no-repeat;
		background-position: left top, left;

		&:before, &:after {
			display: block;
			position: absolute;
			left: 100%;
			margin-left: 5px;
			font-size: 1rem;
			font-weight: normal;
			line-height: 1;
		}

		&:before { top: 0; }
		&:after { bottom: 0; }
	}

	.mod-button {
		margin-top: 0!important;
	}
}

.p-cell-margin {
	display: block;
	font-size: 0;
	line-height: 0;
	background: #fff500;
}

.cell-preview {
	.mod-primaryHeader .mod-primaryHeader__inner {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
}


@media screen and (max-width: 820px) {
	.p-typo-preview {
		overflow-x: auto;
		margin: 0 -20px;
		padding: 0 20px;
	}
}
</style>

