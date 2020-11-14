<template>
	<div class="c-selector">
		<div class="c-selector__input">
			<select @change="updateParam" :data-store-key="storeKey" :value="current">
				<template v-if="!/yakuhanjp/.test(storeKey)">
					<option :value="i" v-for="(choice, i) in choices" :key="i">{{choice}}</option>
				</template>
				<template v-else>
					<option value="true">on</option>
					<option value="false">off</option>
				</template>
			</select>
		</div>
	</div>
</template>

<script>
import _selector from './_selector';
import { debounce } from "lodash"

export default {
	props: ["choices", "current", "store-key"],
	mixins: [ _selector ],
	methods: {
		/** @Override */
		updateParam: function(e) {
			let value = e.target.value;
			let storeKey = e.target.getAttribute("data-store-key");
			let payload = {};
			// 約半の場合はbooleanに変換・それ以外は数値に変換
			if (/yakuhanjp/.test(storeKey)) {
				value = (value === 'true');
			} else {
				value = parseFloat(value);
			}
			payload = { data: [{ storeKey: storeKey, value: value }] };
			this.$store.dispatch("font/updateParam", payload);
		}
	}
};
</script>
