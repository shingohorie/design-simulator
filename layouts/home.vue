<template>
	<div class="l-wrapper">
		<main class="l-main">
			<div class="l-main__inner">
				<div class="p-home">
					<header class="p-home__header">
						<p class="p-home__logo"><nuxt-link to="/"><span>Design Simulator</span></nuxt-link></p>
						<p class="p-home__about">
							<nuxt-link to="/about" v-if="this.$route.name !== 'about'"><span>About</span></nuxt-link>
							<nuxt-link to="/" v-else><span>Back to Top</span></nuxt-link>
						</p>
					</header>
					<div class="p-home__inner">
						<div class="p-home__body">
							<nuxt />
							<div class="p-home-directory">
								<ul class="p-home-directory__items">
									<li class="p-home-directory__item">
										<nuxt-link to="/layout">
											<div class="p-home-directory__page">
												<p class="p-home-directory__en">Sample Page</p>
												<p class="p-home-directory__jp">レイアウトでの確認はこちら</p>
											</div>
										</nuxt-link>
									</li>
									<li class="p-home-directory__item">
										<nuxt-link to="/typography">
											<div class="p-home-directory__page">
												<p class="p-home-directory__en">Text List</p>
												<p class="p-home-directory__jp">見出しまわりの余白の確認はこちら</p>
											</div>
										</nuxt-link>
									</li>
									<li class="p-home-directory__item">
										<nuxt-link to="/io">
											<div class="p-home-directory__page">
												<p class="p-home-directory__en">Settings</p>
												<p class="p-home-directory__jp">設定の読込みや出力はこちら</p>
											</div>
										</nuxt-link>
									</li>
								</ul>
							</div>
							<p class="p-home-copyright"><small>©2020 Rainbow Japan Inc.</small></p>
						</div>
					</div>
				</div>
			</div>
		</main>

		<common-splash />
	</div>
</template>

<script>
import CommonSplash from "@/components/common/splash/splash";

export default {
components: {
	"common-splash": CommonSplash,
	}
};
</script>

<style lang="scss">
.p-home {
	min-height: 100vh;
	padding: 0 300px 0 0;
	background: linear-gradient(161.14deg, #3a51ff 0%, #36c6a6 85.2%) no-repeat right top;
	background-size: 300px 100%;

	&__inner {
		padding: 0 140px 0;
	}

	&__header {
		display: flex;
		align-items: center;
		height: 96px;
		margin-bottom: 50px;
		padding: 28px 40px;
	}

	&__logo {
		span {
			display: inline-block;
			vertical-align: bottom;
			font-size: 0;

			&:before {
				content: "";
				display: block;
				width: 102px;
				padding-top: 32px;
				background: url(~@/assets/img/logo_rj.svg) no-repeat center;
				background-size: contain;
			}
		}
	}

	&__about {
		margin-left: auto;

		a {
			display: inline-block;
			color: #000;

			&:hover {
				span {
				background: #000;
				color: #bbb;
				}
			}
		}

		span {
			display: inline-block;
			min-width: 200px;
			padding: 10px 12px;
			border: 1px solid #000;
			border-radius: 100px;
			text-align: center;
			font-size: 16px;
			line-height: 1.2;
			transition: color 0.3s, background 0.3s;
		}
	}

	&__body {
		max-width: 760px;
		margin: auto;
		padding: 0 0 160px;
	}
}

.p-home-primaryHeader {
	margin-bottom: 30px;
	padding-bottom: 43px;
	border-bottom: 2px solid #000;
	font-size: 80px;
	line-height: 1.1625;
	font-weight: bold;

	span {
		display: block;
		margin: 15px 0 0;
		font-size: 24px;
		line-height: 1.3;
		font-weight: bold;
	}
}

.p-home-lead {
	font-size: 16px;
	line-height: 2;
}

.p-home-directory {
	max-width: 560px;
	margin-top: 200px;
	margin-left: auto;

	&__item {
		border-top: 1px solid #000;

		> a {
			display: block;
			color: #000;

			&:hover {
				color: #bbb;
			}
		}
	}

	&__page {
		display: flex;
		align-items: center;
		padding: 30px 0;
	}

	&__en {
		width: 140px;
		font-size: 24px;
		line-height: 1;
	}

	&__jp {
		flex: 1;
		margin-left: 60px;
		font-size: 14px;
		line-height: 1;
	}
}

.p-home-copyright {
	max-width: 560px;
	margin-top: 60px;
	margin-left: auto;
	font-size: 12px;
	line-height: 1;
}

@media screen and (max-width: 1024px) {
	.p-home {
		padding-right: 150px;
		background-size: 150px 100%;

		&__inner {
			padding: 0 40px;
		}

		&__body {
			padding-bottom: 80px;
		}
	}

	.p-home-primaryHeader {
		font-size: 60px;
		padding-bottom: 20px;

		span {
			font-size: 18px;
		}
	}

	.p-home-directory {
		max-width: none;
		margin-top: 100px;
		margin-left: auto;
		margin-right: auto;
	}

	.p-home-copyright {
		max-width: none;
		margin-left: auto;
		margin-right: auto;
		text-align: right;
	}
}

@media screen and (max-width: 768px) {
	.p-home {
		padding-right: 20px;
		background-size: 20px 100%;

		&__inner {
			padding: 0 20px;
		}

		&__header {
			align-items: center;
			height: 66px;
			padding: 10px 20px 16px;
		}

		&__logo {
			span {
				&:before {
					width: 82px;
					padding-top: 26px;
				}
			}
		}

		&__about {
			span {
				min-width: 120px;
				padding: 8px 12px;
				font-size: 14px;
			}
		}

		&__body {
			padding-bottom: 40px;
		}
	}

	.p-home-lead {
		font-size: 14px;
	}

	.p-home-primaryHeader {
		font-size: 30px;
		padding-bottom: 10px;

		span {
			font-size: 12px;
		}
	}

	.p-home-directory {
		margin-top: 60px;

		&__page {
			padding: 20px 0;
		}

		&__en {
			width: 140px;
			font-size: 18px;
		}

		&__jp {
			margin-left: 30px;
			font-size: 12px;
			line-height: 1.4;
		}
	}
}
</style>
