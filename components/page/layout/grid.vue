<template>
	<div class="p-layout-grid" :class="{'is-show': isShown}">
		<div class="p-layout-grid__inner" ref="grid-wrapper">
			<div class="p-layout-grid__gaps" ref="grid-container">
				<div class="p-layout-grid__gap" v-for="index in (gridCols-1)" :key="index">
					<span v-if="index === (gridCols-1)">ガター</span>
				</div>
			</div>
			<div class="p-layout-grid__outerMargin p-layout-grid__outerMargin--left"></div>
			<div class="p-layout-grid__outerMargin p-layout-grid__outerMargin--right"><span :class="{'fixed': isOverflow}">マージン</span></div>

			<p class="p-layout-grid__breakpoint"><span>Setting : </span></p>
			<p class="p-layout-grid__containerWidth"><span>最大幅</span></p>
		</div>
	</div>
</template>

<script>
import { debounce } from 'lodash'
import { mapMutations, mapGetters } from "vuex"

export default {
	data: function(){
		return {
			gridCols: 12,
			gridWidth: 0,
			isOverflow: false
		}
	},
	mounted: function(){
		let scope = this;
		if (process.browser) {
			scope.sizeGrid();
			window.addEventListener('resize', scope.sizeGrid.bind(scope), false);
		}
	},
	methods: {
		sizeGrid: function(){
			let scope = this;

			if (!scope.$refs['grid-container']) return;

			let params = scope.params;
			let windowWidth = document.documentElement.clientWidth;
			let containerWidth = scope.$refs['grid-container'].clientWidth;
			let param, config, idx;

			if (windowWidth >= params[params.length-1].range.min) {
				param = params[params.length-1];
				idx = params.length-1;

			} else if (windowWidth < params[0].range.min) {
				param = params[0];
				idx = 0;

			} else {
				for (let i=0; i<params.length-1; i++) {
					param = params[i];
					let min = param.range.min;
					let max = param.range.max;

					if (windowWidth >= min && windowWidth < max) {
						idx = i;
						break;
					}
				}
			}

			config = param.config;
			scope.gridCols = config.gridCols;
			scope.gridWidth = (containerWidth - ((scope.gridCols-1) * config.gridGap)) / scope.gridCols;

			scope.$store.commit("breakpoints/updateParamByKey", {
				data: [
					{
						storeIndex: idx,
						storeKey: 'config-actualGridWidth',
						value: scope.gridWidth
					},
					{
						storeIndex: idx,
						storeKey: 'config-actualContainerWidth',
						value: containerWidth
					}
				]
			})
			scope.isOverflow = (scope.$refs['grid-wrapper'].clientWidth + 30) >= document.documentElement.clientWidth;
		}
	},
	computed: {
		...mapGetters("breakpoints", ["params"]),
		...mapGetters("grid", ["isShown"])
	},
	watch: {
		params: {
			handler: function (val, oldVal) {
				let scope = this;
				scope.sizeGrid();
			},
			deep: true
		}
	}
};
</script>

<style lang="scss">
.p-layout-grid {
	position: fixed;
	z-index: -1;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin-top: 88px;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: all 0s linear 0.2s, opacity 0.2s linear 0s;

	&.is-show {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		z-index: 5;
		transition: all 0s linear 0s, opacity 0.2s linear 0.1s;
	}

	&__inner {
		position: relative;
		height: 100%;
		margin: auto;
		padding: 0 20px;
	}

	&__columns,
	&__gaps {
		display: flex;
		height: 100%;
		justify-content: space-between;
	}

	&__gap {
		position: relative;
		width: 70px;
		background: rgba(#00CC6E, 0.4);

		&:last-child {
			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 200px;
				left: 0;
				width: 100%;
				padding-top: 30px;
				background: #00CC6E;
			}

			span {
				display: block;
				position: absolute;
				top: 165px;
				left: 50%;
				padding: 3px 15px;
				color: #fff;
				font-family: 'Roboto', sans-serif;
				font-size: 1.1rem;
				line-height: 1;
				white-space: nowrap;
				background: rgba(#000, 0.7);
				border-radius: 18.5px;
				transform: translateX(-50%);

				&:after {
					margin-left: 0.5em;
				}
			}
		}
	}

	&__outerMargin {
		position: absolute;
		top: 0;
		height: 100%;
		background: rgba(#0097FF, 0.4);

		&--left {
			left: 0;
		}

		&--right {
			right: 0;

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 140px;
				left: 0;
				width: 100%;
				padding-top: 30px;
				background: #0097FF;
			}

			span {
				display: block;
				position: absolute;
				top: 105px;
				left: 50%;
				padding: 3px 15px;
				color: #fff;
				font-family: 'Roboto', sans-serif;
				font-size: 1.1rem;
				line-height: 1;
				white-space: nowrap;
				background: rgba(#000, 0.7);
				border-radius: 18.5px;
				transform: translateX(-50%);

				&.fixed {
					left: auto;
					right: 0;
					transform: none;
				}

				&:after {
					margin-left: 0.5em;
				}
			}
		}
	}

	&__breakpoint {
		position: absolute;
		top: calc(50vh - 70px);
		left: 0;
		right: 0;

		span {
			display: table;
			margin: auto;
			padding: 12px 32px;
			color: #fff;
			font-family: 'Roboto', sans-serif;
			font-size: 2.4rem;
			line-height: 1;
			white-space: nowrap;
			background: rgba(#000, 0.7);
			border-radius: 30.5px;
		}
	}

	&__containerWidth {
		display: flex;
		align-items: center;
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;

		&:before {
			content: '';
			flex: 1;
			display: block;
			padding-top: 10px;
			background: linear-gradient(to bottom, #000 0%, #000 100%) no-repeat left center, url(~@/assets/img/arrow_stroked_left.svg) no-repeat left center;
			background-size: 100% 1px, auto 8px;
		}

		&:after {
			content: '';
			flex: 1;
			display: block;
			padding-top: 10px;
			background: linear-gradient(to bottom, #000 0%, #000 100%) no-repeat left center, url(~@/assets/img/arrow_stroked_right.svg) no-repeat right center;
			background-size: 100% 1px, auto 8px;
		}

		span {
			display: table;
			margin: auto;
			padding: 3px 45px;
			color: #fff;
			font-family: 'Roboto', sans-serif;
			font-size: 1.1rem;
			line-height: 1;
			white-space: nowrap;
			background: rgba(#000, 0.7);
			border-radius: 18.5px;

			&:after {
				margin-left: 0.5em;
			}
		}
	}
}


@media screen and (max-width: 768px) {
	.p-layout-grid {
		margin-top: 112px;

		&__gap {
			&:last-child {
				span {
					font-size: 1rem;
				}
			}
		}

		&__outerMargin {
			&--right {
				span {
					font-size: 1rem;
				}
			}
		}

		&__breakpoint {
			span {
				font-size: 1.4rem;
			}
		}

		&__containerWidth {
			top: 30px;

			span {
				font-size: 1rem;
			}
		}
	}
}
</style>
