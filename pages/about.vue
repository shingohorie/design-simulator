<template>
	<div class="p-home-contents">
		<h1 class="p-home-primaryHeader">About <span>デザインシミュレーターについて</span></h1>

		<div class="p-home-phylosophy">
			<h2 class="p-home-phylosophy__lv2">背景</h2>

			<div class="p-home-phylosophy__paragraph">
				<p>❌ レイアウトカンプのみの限界</p>
				<p>❌ DEとFE間の認識の齟齬</p>
				<p>❌ 受け渡しガイド作成による負担増</p>
				<p>❌ 端末毎の想定の見落としによる品質低下</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>基本的には<br>👍 あらゆる端末で崩れがなく（正しいグリッド設計）<br>👍 見やすく使いやすい（適度な余白と文字サイズ （コントラストなどもあるがここでは省く））<br><br>ことで、大半の情報はユーザーに正しく提示ができる。</p>
				<p>「つたえる」よりも前に「正しく情報を提示」出来なくてはいけない。</p>
			</div>


			<h2 class="p-home-phylosophy__lv2">目的</h2>

			<div class="p-home-phylosophy__paragraph">
				<p>💡 効率化<br>DE, FE間の細部設定の効率的共有</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>💡 品質向上<br>レスポンシブweb実装の品質向上<br>基本的設計の品質向上</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>💡 教育観点<br>サイト設計の基本的要件の理解<br>情報構造やコーディングへの理解</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>このツールによって、「簡単に出来上がる」わけではなく、利用者自身がこのツールを理解し、活用することを望む。</p>
			</div>


			<h2 class="p-home-phylosophy__lv2">使用方法</h2>

			<div class="p-home-phylosophy__paragraph">
				<p>👍 案件初期が効果的</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>トーンアンドマナーが承認され、下層を含めた設計が本格始動する段階でDEが基本要件を固める<br>（それまではある意味ラフでも良いと考える。はじめに定義しすぎて、制限とならないように注意）</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>🔍 ブレイクポイント</p>
				<p>🔍 グリッド設計</p>
				<p>🔍 フォントファミリー</p>
				<p>🔍 フォントサイズ・行間・字間</p>
				<p>🔍 余白</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>SketchやXDなどへの適応は以下などを反映・考慮</p>
				<p>👉 グリッド設計</p>
				<p>👉 フォント関連（ファミリー/行間程度　字間は厳しいかも）</p>
			</div>

			<div class="p-home-phylosophy__paragraph">
				<p>あまり神経質にカンプへの反映を行いすぎない（非効率）</p>
				<p>「定義したルール」と「カンプ」を切り分けて考える。</p>
			</div>


			<h2 class="p-home-phylosophy__lv2">未来</h2>

			<div class="p-home-phylosophy__paragraph">
				<p>🤔 出力→見出し反映→スタイルガイド（案件独自のシミュレーターって可能？）</p>
				<p>🤔 カラースタイルの制御（通常とダークモードの２種）</p>
				<p>参考: <a href="https://kudakurage.hatenadiary.com/entry/2019/07/29/083000" target="_blank">https://kudakurage.hatenadiary.com/entry/2019/07/29/083000</a></p>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'about',
	layout: 'home',
	head () {
		return {
			title: 'About',
			meta: [
				{ hid: 'description', name: 'description', content: 'About' }
			]
		}
	}
}
</script>

<style lang="scss">
.p-home-phylosophy {
	font-size: 16px;
	line-height: 2;

	&__lv2 {
		margin-top: 100px;
		margin-bottom: 20px;
		font-size: 32px;
		line-height: 2;
		font-weight: normal;
	}

	&__paragraph {
		& + & {
			margin-top: 2em;
		}
	}
}

@media screen and (max-width: 1024px) {
	.p-home-phylosophy {
		&__lv2 {
			margin-top: 50px;
			margin-bottom: 10px;
			font-size: 26px;
		}
	}
}

@media screen and (max-width: 768px) {
	.p-home-phylosophy {
		font-size: 14px;
		line-height: 1.8;

		&__lv2 {
			margin-top: 30px;
			margin-bottom: 10px;
			font-size: 20px;
		}
	}
}
</style>
