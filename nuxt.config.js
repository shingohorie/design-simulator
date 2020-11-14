const basePath = '/';

module.exports = {
	//mode: 'universal',
	ssr: true,
	telemetry: false,
	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'ja'
		},
		titleTemplate: '%s | Design Simulator',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'robots', content: 'noindex, nofollow' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
			{ hid: 'theme-color', name: 'theme-color', content: '#222222' },
			{ name: 'dns-prefetch', content: '//cdnjs.cloudflare.com/' },
			{ name: 'dns-prefetch', content: '//fonts.googleapis.com/' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' },
			{ rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700,900&display=swap' },
			{ rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto+Condensed&display=swap' },
			{ rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap' },
			{ rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' }
		]
	},
	manifest: {
		name: 'RJ Design Simulator',
		short_name: 'RJ Design Simulator',
		title: 'RJ Design Simulator',
		lang: 'ja',
		theme_color: '#222222',
		background_color: '#222222',
		start_url: basePath,
		orientation: "portrait",
		crossorigin: 'use-credentials',
		scope: basePath,
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'ress',
		'yakuhanjp',
		'@/assets/scss/_vendor.scss',
		'@/assets/scss/base.scss',
		'@/assets/scss/common.scss',
		'vue-json-pretty/lib/styles.css'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{
			src: '@/plugins/components.js',
			ssr: true
		},
		{
			src: '@/plugins/vue-json-pretty.js',
			ssr: false
		},
		{
			src: '@/plugins/vue-range-slider.js',
			ssr: false
		}
		// {
		// 	src: '@/plugins/localStorage',
		// 	ssr: false
		// },
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		['@nuxtjs/pwa', { workbox: false }],
		'nuxt-basic-auth-module',
	],
	/*
	** Basic Authentication
	*/
	basic: {
		name: process.env.BASIC_AUTH_ID,
		pass: process.env.BASIC_AUTH_PW,
		enabled: process.env.BASIC_ENABLED === 'true'
	},
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		credentials: true
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
			config.module.rules.push(
				{
					type: 'javascript/auto',
					test: /\.json/,
					loader: 'json-loader'
				}
			);
			config.node = {
				fs: "empty"
			}
		},
		postcss: {
			plugins: {
				cssnano: {
					preset: ['default', { minifyFontValues: { removeQuotes: false } }]
				}
			},
			preset: {
				autoprefixer: {
					grid: true
				}
			}
		},
		extractCSS: true
	},
	/*
	** Router
	*/
	router: {
		base: basePath
	}
}
