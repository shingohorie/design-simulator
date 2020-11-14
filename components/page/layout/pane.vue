<template>
	<div class="p-layout-preview" ref="p-layout-preview">

		<div class="p-layout-preview__grid">
			<grid />
		</div>

		<div class="p-layout-preview__modules">
			<mod-mainvisual>H1 ぼくらが非情の<br>大河をくだる時</mod-mainvisual>

			<mod-secondary-header>H2 木曾路はすべて山の中である</mod-secondary-header>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-media-group
				column="1"
				:items="[
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/05.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						],
						buttonHref: 'https://www.rainbow.co.jp/',
						buttonText: 'ボタン',
						buttonTarget: '_blank'
					}
				]"
			/>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-media-group
				column="1"
				:items="[
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/05.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						],
						buttonHref: 'https://www.rainbow.co.jp/',
						buttonText: 'ボタン',
						direction: 'rightWards'
					}
				]"
			/>

			<mod-secondary-header>H2 木曾路はすべて山の中である</mod-secondary-header>

			<mod-media-group-v2
				column="2"
				:items="[
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/03.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/03.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					}
				]"
			/>

			<mod-button-group
				direction="central"
				column="1"
				:items="[
					{
						text: 'ボタン',
						href: 'https://www.rainbow.co.jp/',
						target: '_blank'
					}
				]"
			/>

			<mod-secondary-header>H2 木曾路はすべて山の中である</mod-secondary-header>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-card-group
				column="2"
				:items="[
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/04.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						],
						buttonHref: 'https://www.rainbow.co.jp/',
						buttonText: 'ボタン',
						buttonTarget: '_blank'
					},
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/04.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						],
						buttonHref: 'https://www.rainbow.co.jp/',
						buttonText: 'ボタン',
						buttonTarget: '_blank'
					}
				]"
			/>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-card-group-v2
				column="3"
				:items="[
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/01.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/01.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						heading: 'リード  高瀬舟は京都の高瀬川を上下する小舟である',
						imageSrc: require('@/assets/img/dummy/01.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					}
				]"
			/>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-card-group-v2
				column="4"
				:items="[
					{
						imageSrc: require('@/assets/img/dummy/02.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  高瀬舟は京都の高瀬川を上下する小舟である</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						imageSrc: require('@/assets/img/dummy/02.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  高瀬舟は京都の高瀬川を上下する小舟である</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						imageSrc: require('@/assets/img/dummy/02.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  高瀬舟は京都の高瀬川を上下する小舟である</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					},
					{
						imageSrc: require('@/assets/img/dummy/02.jpg'),
						texts: [
							{
								el: 'regularText',
								text: '<strong>通常テキスト  高瀬舟は京都の高瀬川を上下する小舟である</strong>'
							},
							{
								el: 'regularText',
								text: '通常テキスト  政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。'
							},
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							},
							{
								el: 'noteText',
								text: '注釈  日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚する'
							}
						]
					}
				]"
			/>

			<mod-button-group
				direction="central"
				column="1"
				:items="[
					{
						text: 'ボタン',
						href: ''
					}
				]"
			/>

			<mod-secondary-header>H2 木曾路はすべて山の中である</mod-secondary-header>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-regular-text>通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。<br>道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、蔦のかずらを頼みにしたような危い場処ではなくなって、徳川時代の末にはすでに渡ることのできる橋であった。新規に新規にとできた道はだんだん谷の下の方の位置へと降って来た。道の狭いところには、木を伐って並べ、藤づるでからめ、それで街道の狭いのを補った。</mod-regular-text>

			<mod-regular-text>通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。<br>道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、蔦のかずらを頼みにしたような危い場処ではなくなって、徳川時代の末にはすでに渡ることのできる橋であった。新規に新規にとできた道はだんだん谷の下の方の位置へと降って来た。道の狭いところには、木を伐って並べ、藤づるでからめ、それで街道の狭いのを補った。</mod-regular-text>

			<mod-text-group
				column="2"
				:items="[
					{
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						]
					},
					{
						texts: [
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						]
					}
				]"
			/>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-regular-text>通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。<br>道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。名高い桟も、蔦のかずらを頼みにしたような危い場処ではなくなって、徳川時代の末にはすでに渡ることのできる橋であった。新規に新規にとできた道はだんだん谷の下の方の位置へと降って来た。道の狭いところには、木を伐って並べ、藤づるでからめ、それで街道の狭いのを補った。</mod-regular-text>

			<mod-card-group
				column="2"
				:items="[
					{
						imageSrc: require('@/assets/img/dummy/05.jpg'),
						texts: [
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							}
						]
					},
					{
						imageSrc: require('@/assets/img/dummy/04.jpg'),
						texts: [
							{
								el: 'captionText',
								text: 'キャプション  そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来'
							}
						]
					}
				]"
			/>

			<mod-secondary-header>H2 木曾路はすべて山の中である</mod-secondary-header>

			<mod-tertiary-header>H3 グスコーブドリはイーハトーヴの大きな森のなかに</mod-tertiary-header>

			<mod-text-group
				column="2"
				:items="[
					{
						texts: [
							{
								el: 'quaternaryHeader',
								text: 'H4 高瀬舟は京都の高瀬川を上下する小舟である'
							},
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						]
					},
					{
						texts: [
							{
								el: 'quaternaryHeader',
								text: 'H4 高瀬舟は京都の高瀬川を上下する小舟である'
							},
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						]
					}
				]"
			/>

			<mod-text-group
				column="2"
				:items="[
					{
						texts: [
							{
								el: 'quaternaryHeader',
								text: 'H4 高瀬舟は京都の高瀬川を上下する小舟である'
							},
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						],
						buttonHref: '',
						buttonText: 'ボタン'
					},
					{
						texts: [
							{
								el: 'quaternaryHeader',
								text: 'H4 高瀬舟は京都の高瀬川を上下する小舟である'
							},
							{
								el: 'regularText',
								text: '通常テキスト  木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。'
							}
						],
						buttonHref: '',
						buttonText: 'ボタン'
					}
				]"
			/>

		</div>

	</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
import Grid from "@/components/page/layout/grid"

export default {
	props: ["mode"],
	components: {
		grid: Grid
	},
	computed: {
		...mapGetters("breakpoints", ["params", "basePoint"])
	}
};
</script>

<style lang="scss">
.p-layout-preview {
	position: relative;
	margin: auto;
	padding: 0 0 100px;
	overflow: hidden;

	&__modules {
		> *:first-child {
			margin-top: 0 !important;
		}

		> *:last-child {
			margin-bottom: 0 !important;
		}
	}
}
</style>
