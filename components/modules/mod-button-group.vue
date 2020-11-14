<template>
	<div class="mod-buttonGroup" :class="[directionClass, columnClass]">
		<div class="mod-buttonGroup__inner">
			<div class="mod-buttonGroup__items">
				<div class="mod-buttonGroup__item" v-for="(item, index) in items" :key="index">
					<mod-button
						:href="item.href"
						:target="item.target"
					>{{item.text}}</mod-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["column", "direction", "items"],
	computed: {
		columnClass: function(){
			let scope = this;
			let prefix = 'mod-buttonGroup--';
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
		},
		directionClass: function(){
			let scope = this;
			return 'mod-buttonGroup--' + scope.direction;
		}
	}
}
</script>
