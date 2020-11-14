<template>
  <div class="l-controlpanel" :class="{'is-show': isShown}">
    <div class="l-controlpanel__inner">
		<div class="l-controlpanel__controllers">
			<div class="l-controlpanel__controller">
				<button type="reset" class="c-button c-button--full" @click.prevent="resetParam"><span>すべてリセット</span></button>
			</div>
			<div class="l-controlpanel__controller">
				<button type="submit" class="c-button c-button--full c-button--white" @click.prevent="close"><span>設定を確定</span></button>
			</div>
		</div>
		<ul class="l-controlpanel__switchers">
			<li class="l-controlpanel__switcher" :class="{'is-active': currentTab === 'grid'}">
				<a href="" @click.prevent="switchTab('grid')">グリッド設定</a>
			</li>
			<li class="l-controlpanel__switcher" :class="{'is-active': currentTab === 'font'}">
				<a href="" @click.prevent="switchTab('font')">フォント設定</a>
			</li>
			<li class="l-controlpanel__switcher" :class="{'is-active': currentTab === 'detail'}">
				<a href="" @click.prevent="switchTab('detail')">詳細設定</a>
			</li>
		</ul>

		<div class="l-controlpanel__pane" v-show="currentTab === 'grid'">
			<pane-grid />
        </div>

        <div class="l-controlpanel__pane" v-show="currentTab === 'font'">
			<pane-font />
        </div>

		<div class="l-controlpanel__pane" v-show="currentTab === 'detail'">
			<pane-detail />
        </div>
    </div>
	<p class="l-controlpanel__close"><a href="" @click.prevent="close"></a></p>
  </div>
</template>

<script>
import paneGrid from "./pane/pane-grid"
import paneFont from "./pane/pane-font"
import paneDetail from "./pane/pane-detail"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	components: {
		"pane-grid": paneGrid,
		"pane-font": paneFont,
		"pane-detail": paneDetail
	},
	methods: {
		resetParam: function(){
			let isConfirmed = confirm('すべての設定値がリセットされますがよろしいですか？');
			if (isConfirmed) {
				this.$store.dispatch('breakpoints/resetParam');
				this.$store.dispatch('font/resetParam');
			}
		},
		...mapMutations("controlpanel", ["close", "switchTab", "switchBreakpoint"])
	},
	computed: {
		...mapGetters("controlpanel", ["isShown", "currentTab", "currentBreakpoint"]),
		...mapGetters("breakpoints", ["params"])
	}
};
</script>

<style lang="scss">
.l-controlpanel {
	position: fixed;
	z-index: -1;
	top: 0;
	left: 100vw;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.9);
	overflow: auto;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: all 0s linear 0.2s, opacity 0.2s linear 0s;

	&.is-show {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		left: 0;
		z-index: 150;
		transition: all 0s linear 0s, opacity 0.2s linear 0.1s;
	}

	&__inner {
		position: relative;
		width: 1280px;
		margin: auto;
		padding: 64px 20px;
		color: #fff;
		height: 100%;
	}

	&__controllers {
		margin-bottom: 60px;
		text-align: right;
	}

	&__controller {
		display: inline-block;
		vertical-align: bottom;
		min-width: 200px;

		&:not(:last-child) {
			margin-right: 20px;
		}
	}

	&__switchers {
		position: relative;
		display: flex;

		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 1px;
			margin: 15px 0;
			background: #666;
		}
	}

	&__switcher{
		position: relative;
		flex: 1;
		text-align: center;
		font-weight: 500;
		font-size: 12px;
		line-height: 1;
		border-bottom: 1px solid #fff;

		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			z-index: 1;
			width: 1px;
			margin: 15px 0;
			background: #666;
		}

		&:after {
			content: '';
			display: none;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			width: 1px;
			margin: 15px 0;
			background: #666;
		}

		a {
			display: block;
			padding: 20px 5px;
			color: #fff;

			&:hover {
				color: inherit;
			}
		}

		&.is-active {
			border-top: 1px solid #fff;
			border-bottom-color: transparent;

			&:before {
				margin: 0 0 -1px;
				background: #fff;
			}

			&:after {
				display: block;
				margin: 0 0 -1px;
				background: #fff;
			}

			a {
				pointer-events: none;
			}
		}
	}

	&__close {
		position: fixed;
		top: 0;
		right: 0;
		font-size: 0;

		> a {
			position: relative;
			display: block;
			width: 40px;
			height: 40px;
			background: #000;
			overflow: hidden;

			&:before {
				content: "";
				display: block;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 22px;
				height: 1px;
				margin: auto;
				background: #a0a0a0;
				transform: rotate(45deg);
			}

			&:after {
				content: "";
				display: block;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 22px;
				height: 1px;
				margin: auto;
				background: #a0a0a0;
				transform: rotate(-45deg);
			}

			&:hover {
				&:before, &:after {
					background: #fff;
				}
			}
		}
	}
}

.l-setting {
	min-height: 100vh;

	&__body {
		display: flex;
	}

	&__menu {
		width: 254px;
		margin-right: 80px;
		padding: 60px 0;
		border-right: 1px solid #666;
	}

	&__main {
		flex: 1;
		padding: 60px 0;
	}

	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 42px;
	}

	&__overwriter {
		margin-left: auto;
		min-width: 150px;
	}

	&__primaryHeader {
		font-size: 4rem;
		font-family: 'Roboto', sans-serif;
		font-weight: 200;
	}

	&__secondaryHeader {
		margin-bottom: 40px;
		padding-left: 8px;
		font-weight: 700;
		font-size: 1.4rem;
		line-height: 1.4;
		color: #fff;
		border-left: 1px solid #aaa;

		* + & {
			margin-top: 30px;
		}
	}
}
</style>
