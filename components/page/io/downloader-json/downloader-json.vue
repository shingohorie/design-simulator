<template>
	<div class="p-io-downloader">
		<div class="p-io-downloader__controllers">
			<div class="p-io-downloader__controller">
				<button @click="download"><span>{{ label }}</span></button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapActions, mapGetters  } from 'vuex'

export default {
	props: ["label", "data", "filename"],
	data: function () {
		return {
		}
	},
	created: function(){
	},
	methods: {
		download: function(){
			let scope = this;
			let obj = JSON.stringify(scope.data, null, "\t");
			let blob = new Blob([obj], { "type": "text/plain" });
			let url = window.URL.createObjectURL(blob);
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = scope.filename;
			link.click()
		}
	}
}
</script>

<style lang="scss">
.p-io-downloader {
	&__controllers {
		display: flex;
		margin-top: 20px;
	}

	&__controller {
		text-align: left;

		button {
			&:hover {
				span {
					background: #000;
					color: #fff;
				}
			}
		}

		span {
			display: inline-block;
			min-width: 160px;
			padding: 10px 20px;
			border: 1px solid #000;
			border-radius: 100px;
			text-align: center;
			font-size: 16px;
			line-height: 1.2;
			transition: color .3s, background .3s;
		}
	}
}
</style>
