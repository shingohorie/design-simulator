<template>
	<div class="mod-cardGroup break-sp" :class="[columnClass]">
		<div class="mod-cardGroup__inner">
			<div class="mod-cardGroup__items">
				<div class="mod-cardGroup__item" v-for="(item, index) in items" :key="index">
					<mod-card-v2
						:heading="item.heading"
						:imageSrc="item.imageSrc"
						:texts="item.texts"
						:buttonText="item.buttonText"
						:buttonHref="item.buttonHref"
						:buttonTarget="item.buttonTarget"
						:direction="item.direction"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["column", "items"],
	computed: {
		columnClass: function(){
			let scope = this;
			let prefix = 'mod-cardGroup--';
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
