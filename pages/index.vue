<template>
	<div class="p-home-contents">
		<h1 class="p-home-primaryHeader">Design Simulator <span>デザインシミュレータ</span></h1>
		<p class="p-home-lead">レスポンシブデザインを前提にしたグリッドシステムのシミュレーションができるツールです。ウィンドウの幅をリサイズすると、それに反応してページ全体のレイアウトが変化します。ブレイクポイント、フォントファミリー、フォントサイズ、見出しやセクション間マージンなど詳細なシミュレーションが可能となっています。</p>
	</div>
</template>

<script>
export default {
	name: 'home',
	layout: 'home',
	head () {
		return {
			title: 'RJ Design Simulator',
			titleTemplate: ''
		}
	}
}
</script>



