<template>
	<div class="c-inputter">
		<p class="c-inputter__input" :data-unit="thisUnit">
			<input
				type="text"
				:value="value"
				@keyup="updateParam"
				:readonly="readonly"
				:data-store-key="storeKey"
				:data-store-index="storeIndex"
				pattern="(\\.[0-9]+)?"
			/>
		</p>
		<p class="c-inputter__note" v-show="note">{{ note }}</p>
	</div>
</template>

<script>
import Vue from 'vue'
import _inputter from './_inputter';
import { debounce } from "lodash"

export default {
	mixins: [ _inputter ],
	methods: {
		/** @Override */
		updateParam: debounce(function(e) {
			let scope = this;
			let value = e.target.value;
			let storeKey = e.target.getAttribute("data-store-key");
			let storeIndex = e.target.getAttribute("data-store-index");
			let isPassed = false;
			let payload = {};

			// 全角数字を半角数字に変換
			value = value.replace(/[０-９]/g, function(s) {
				return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
			});

			if (/range/.test(storeKey)) {
				return;
			} else {
				isPassed = /^([1-9]\d*|0)(\.\d+)?$/.test(value);
			}

			// 整数または小数のみstoreへの変更を受け付ける
			if ( isPassed ) {
				value = parseFloat(value);
				storeIndex = parseFloat(storeIndex);
				payload = { data: [{ storeKey: storeKey, storeIndex: storeIndex, value: value }] };

				if (/config/.test(storeKey)) {
					this.$store.dispatch("breakpoints/updateConfigParam", payload);
				} else if (/modules/.test(storeKey)) {
					this.$store.dispatch("breakpoints/updateModulesParam", payload);
				} else {
					this.$store.commit("breakpoints/updateParamByKey", payload);
				}
			} else if (/containerWidth/.test(storeKey) && value === 'none') {
				storeIndex = parseFloat(storeIndex);
				payload = { data: [{ storeKey: storeKey, storeIndex: storeIndex, value: value }] };
				this.$store.dispatch("breakpoints/updateConfigParam", payload);
			} else {
				alert("不正な入力値です");
			}
		}, 600)
	},
	computed: {
		thisUnit: function() {
			return this.value !== 'none' ? this.unit : '';
		}
	}
};
</script>
