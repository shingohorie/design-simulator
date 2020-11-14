<template>
	<div class="mod-textGroup" :class="[columnClass]" ref="textGroup">
		<div class="mod-textGroup__inner">
			<div class="mod-textGroup__items">
				<div class="mod-textGroup__item" v-for="(item, i) in items" :key="i" :class="{'has-button': findButton(item), 'collapse-sp': findNextHeader(items[i+1])}">
					<div class="mod-textGroup__texts">
						<texts-renderer v-for="(text, j) in item.texts" :el="text.el" :key="j">{{text.text}}</texts-renderer>
					</div>
					<mod-button :href="item.buttonHref" :target="item.buttonTarget" v-if="item.buttonText">{{item.buttonText}}</mod-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { findIndex } from 'lodash';
import TextsRenderer from "@/components/modules/texts-renderer";

export default {
	props: ["column", "items"],
	components: {
		"texts-renderer": TextsRenderer
	},
	computed: {
		findNextHeader: function(){
			return function(item){
				if (!item) return false;

				let hasHeader = findIndex(item.texts, function(t){
					return /Header/.test(t.el);
				});
				return hasHeader !== -1;
			}
		},
		findButton: function(){
			return function(item){
				let hasButton = item.buttonText !== void 0;
				return hasButton;
			}
		},
		columnClass: function(){
			let scope = this;
			let prefix = 'mod-textGroup--';
			let className = '';
			if (scope.column === "1") {
				className = 'single';
			} else if (scope.column === "2") {
				className = 'twoUp';
			} else if (scope.column === "3") {
				className = 'threeUp';
			} else if (scope.column === "4") {
				className = 'fourUp';
			}
			return prefix + className;
		}
	}
}
</script>
