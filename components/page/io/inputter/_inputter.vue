<template>
	<div class="p-io-inputter">
		<div class="p-io-inputter__jsonViewer">
			<client-only>
				<vue-json-pretty v-model="data" :deep="0" :data="data"></vue-json-pretty>
			</client-only>
		</div>

		<div class="p-io-inputter__uploader">
			<uploader @change="onUpload" @clear="clear" label="JSON File Input" :allowedExt="allowedExt"></uploader>
		</div>

		<div class="p-io-inputter__controllers">
			<p class="p-io-inputter__controller">
				<button :disabled="isPristine" @click="submit" type="submit"><span>反映する</span></button>
			</p>
			<p class="p-io-inputter__controller">
				<button :disabled="isPristine" @click="cancel" type="reset"><span>クリア</span></button>
			</p>
		</div>
	</div>

</template>

<script>
import { cloneDeep } from 'lodash'
import { mapMutations, mapActions, mapGetters  } from 'vuex'
import Uploader from '@/components/page/io/uploader/uploader.vue'

export default {
	props: ["currents", "label"],
	data: function () {
		return {
			data: this.currents,
			isPristine: true,
			allowedExt: [".json"]
		}
	},
	components: {
		'uploader': Uploader
	},
	methods: {
		cancel: function(){
			let scope = this;
			let canInput = confirm("入力された内容が失われますが、よろしいですか？");
			scope.data = scope.currents;
			scope.isPristine = true;
		},
		clear: function(){
			let scope = this;
			scope.isPristine = true;
			scope.data = scope.currents;
		},
		onUpload: function(file){
			let scope = this;
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function() {
				scope.data = JSON.parse(reader.result);
				scope.isPristine = false;
			}
		},
		submit: function(){}
	}
};
</script>

<style lang="scss">
.p-io-inputter {
	&__jsonViewer {
		position: relative;
		margin-bottom: 20px;
		padding: 30px 15px 15px;
		background: rgba(0,0,0,.06);

		&:before {
			content: 'JSON Preview';
			position: absolute;
			top: 5px;
			left: 16px;
			font-size: 12px;
		}
	}

	&__controllers {
		display: flex;
		margin-top: 20px;
	}

	&__controller {
		margin-right: 20px;

		button {
			display: inline-block;
			width: auto;

			&:not([type="submit"]):hover {
				span {
					background: #000;
					color: #fff;
				}
			}

			&[type="submit"]:hover {
				span {
					background: #fff;
					color: #000;
				}
			}

			&:not([type="submit"]) span {
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

			&[type="submit"] span {
				display: inline-block;
				min-width: 160px;
				padding: 10px 20px;
				border: 1px solid #000;
				border-radius: 100px;
				text-align: center;
				font-size: 16px;
				line-height: 1.2;
				background: #000;
				color: #fff;
				transition: color .3s, background .3s;
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.p-io-inputter {
		&__controllers {
			margin-top: 20px;
		}
	}
}
</style>
