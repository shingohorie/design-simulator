<template>
	<header class="l-header">
		<div class="l-header__inner">
			<div class="l-header__siteroot">
				<p class="l-siteroot">
					<nuxt-link to="/"><span>Design Simulator</span></nuxt-link>
				</p>
			</div>

			<div class="l-header__menu">
				<div class="l-menu">
					<ul class="l-menu__items">
						<li class="l-menu__item l-menu__item--settings" :class="{'is-active': isPanelShown}">
							<a href="" @click.prevent="showPanel"><span>設定</span></a>
						</li>
						<li class="l-menu__item l-menu__item--guide" v-if="this.$route.name === 'layout'" :class="{'is-active': isGridShown}">
							<a href="" @click.prevent="toggleGrid"><span>グリッド</span></a>
						</li>
					</ul>
				</div>
			</div>

			<div class="l-header__viewport">
				<p class="l-viewport">Browser Width <span>{{windowWidth}}</span></p>
			</div>

			<div class="l-header__nav">
				<nav class="l-gnav">
					<ul class="l-gnav__items">
						<li class="l-gnav__item">
							<nuxt-link to="/layout" exact-active-class="is-active">Sample Page</nuxt-link>
						</li>
						<li class="l-gnav__item">
							<nuxt-link to="/typography" exact-active-class="is-active">Text List</nuxt-link>
						</li>
						<li class="l-gnav__item">
							<nuxt-link to="/io" exact-active-class="is-active">Settings</nuxt-link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<script>
import cssbeautify from "cssbeautify"
import { mapMutations, mapGetters } from "vuex"

export default {
	data: function() {
		return {
			windowWidth: 0
		}
	},
	mounted () {
		let scope = this;
		if (process.browser) {
			scope.onscroll();
			scope.onresize();
			window.addEventListener("scroll", scope.onscroll, false);
			window.addEventListener("resize", scope.onresize, false);
		}
	},
	methods: {
		css: function(){
			if (process.browser) {
				let cssText = document.querySelector('#vue-rendered-style-module').innerText
				cssText = cssbeautify(cssText, { indent: "\t", autosemicolon: true });
				cssText = cssText.replace(/(\/\*)/g, "\r\n\r\n$1").replace(/(\*\/)/g, "$1\r\n");
			}
		},
		...mapMutations("grid", {
			toggleGrid: "toggle"
		}),
		...mapMutations("controlpanel", {
			showPanel: "show"
		}),
		onscroll: function() {
			let header = document.querySelector(".l-header");
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

			if (scrollTop >= 10) {
				header.classList.add("is-shaded");
			} else {
				header.classList.remove("is-shaded");
			}

			header.style.transform = 'translateX(' + scrollLeft + 'px)';
		},
		onresize: function(){
			let scope = this;
			scope.windowWidth = window.innerWidth;
		}
	},
	computed: {
		...mapGetters("controlpanel", {
			isPanelShown: "isShown"
		}),
		...mapGetters("grid", {
			isGridShown: "isShown"
		})
	}
};
</script>

<style lang="scss" scoped>
.l-header {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;
	height: 96px;
	background: #fff;
	transition: box-shadow 0.3s;

	&.is-shaded {
		box-shadow: 0 0 3px rgba(0,0,0,.3);
	}

	&__inner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 28px 40px;
	}

	&__siteroot {
		margin-right: auto;
	}

	&__viewport {
		margin-left: 24px;
	}

	&__nav {
		margin-left: auto;
	}
}

.l-siteroot {
	font-size: 1.4rem;
	line-height: 1;
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
	white-space: nowrap;

	a {
		display: inline-block;
		vertical-align: bottom;
		color: inherit;
	}

	span {
		display: flex;
		align-items: center;

		&:before {
			content: '';
			display: block;
			width: 102px;
			padding-top: 32px;
			margin-right: 30px;
			background: url(~@/assets/img/logo_rj.svg) no-repeat center;
			background-size: contain;
		}
	}
}

.l-menu {
	&__items {
		display: flex;
		align-items: center;
	}

	&__item {

		&:not(:last-child) {
			margin-right: 8px;
		}

		&--settings {
			span {
				&:before {
					background-image: url(~@/assets/img/icon_menu.svg);
				}

			}

			&:not(.is-disabled).is-active, &:not(.is-disabled):hover{
				span{
					&:before {
						background-image: url(~@/assets/img/icon_menu_grad.svg);
					}
				}
			}
		}

		&--guide {
			span {
				&:before {
					background-image: url(~@/assets/img/icon_guide.svg);
				}
			}

			&:not(.is-disabled).is-active, &:not(.is-disabled):hover{
				span{
					&:before {
						background-image: url(~@/assets/img/icon_guide_grad.svg);
					}
				}
			}
		}

		a {
			display: inline-block;
			vertical-align: bottom;
		}

		span {
			display: block;
			font-size: 0;
			line-height: 0;

			&:before {
				content: "";
				display: block;
				width: 40px;
				height: 40px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}
		}
	}
}

.l-viewport {
	padding: 5px 34px;
	background: #EEEEEE;
	font-size: 1.2rem;
	line-height: 1.5;
	border-radius: 17.5px;

	span {
		margin-left: 15px;
		font-size: 1.4rem;
		line-height: 1;
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
	}
}

.l-gnav {
	&__items {
		display: flex;
		align-items: center;
	}

	&__item {
		font-size: 1.6rem;
		line-height: 1;
		font-family: 'Roboto', sans-serif;
		font-weight: 700;


		&:not(:last-child) {
			margin-right: 30px;
		}

		a {
			position: relative;
			display: inline-block;
			vertical-align: bottom;
			padding-bottom: 15px;
			margin-bottom: -15px;
			color: #bbb;
			overflow: hidden;
			transition: color .3s;

			&:after {
				content: '';
				display: block;
				position: absolute;
				width: 0;
				right: 0;
				bottom: 0;
				padding-top: 2px;
				background: linear-gradient(to right, #3A51FF 0%, #36C6A6 100%) no-repeat left top;
				transition: width 0.2s ease-in-out, right 0.2s ease-in-out, left 0.2s ease-in-out;
			}

			&.is-active, &:hover {
				color: #000;

				&:after {
					width: 100%;
					right: auto;
					left: 0;
				}
			}
		}
	}
}

@media screen and (max-width: 936px) {
	.l-header {
		&__siteroot {
			order: 1;
		}

		&__viewport {
			order: 2;
			margin-left: auto;
			margin-right: auto;
		}

		&__menu {
			order: 3;
			margin-left: auto;
			margin-right: 0;
		}

		&__nav {
			flex: none;
			display: none;
		}
	}
}

@media screen and (min-width: 769px) and (max-width: 936px) {
	.l-siteroot {
		span {
			font-size: 0;
		}
	}
}

@media screen and (max-width: 768px) {
	.l-header {
		height: 112px;

		&__inner {
			flex-wrap: wrap;
			padding: 10px 20px 16px;
		}

		&__siteroot {
			order: 1;
			margin-top: 8px;
			margin-bottom: 8px;
		}

		&__nav {
			display: none;
		}

		&__viewport {
			order: 3;
			flex: none;
			width: 100%;
			margin-top: 15px;
		}

		&__menu {
			order: 2;
			margin-left: auto;
		}
	}

	.l-siteroot {
		font-size: 1.1rem;

		span {
			&:before {
				width: 82px;
				padding-top: 26px;
				margin-right: 15px;
			}
		}
	}

	.l-menu {
		&__item {
			&:not(:last-child) {
				margin-right: 0;
			}
		}
	}

	.l-viewport {
		display: table;
		margin: auto;
	}
}
</style>
