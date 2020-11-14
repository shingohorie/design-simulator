<template>
	<label class="p-io-uploader" :class="{'is-pristine': isPristine}">
		<input type="file" @change="onChange" ref="uploader"><span>{{ message }}</span>
		<button class="p-io-uploader__canceler" @click="onClear">&times;</button>
	</label>
</template>

<script>
export default {
	props: ['allowedExt', 'label'],
	data: function () {
		return {
			initialMessage: '',
			message: '',
			isPristine: true
		}
	},
	created: function(){
		let scope = this;
		scope.initialMessage = scope.label;
		scope.message = scope.initialMessage;
	},
	methods: {
		onClear: function(){
			let scope = this;
			scope.$refs['uploader'].value = '';
			scope.message = scope.initialMessage;
			scope.isPristine = true;
			scope.$emit('clear');
		},
		onChange: function(e){
			e.stopPropagation();

			let scope = this;
			let file = e.target.files;
			let filename;

			if (file === void 0) return;

			file = file[0];
			filename = file.name;

			if (scope.allowedExt === void 0) {
				scope.message = file.name;
				scope.isPristine = false
				scope.$emit('change', file);
				return;
			}

			if (scope.allowedExt.some(function(ext){
				let reg = new RegExp('\\' + ext + '$');
				return reg.test(filename);
			})) {
				scope.message = file.name;
				scope.isPristine = false;
				scope.$emit('change', file);
			} else {
				alert('許可されていない拡張子です');
				scope.$refs['uploader'].value = '';
				scope.message = scope.initialMessage;
				scope.isPristine = true;
			}
		}
	}
};
</script>

<style lang="scss">
.p-io-uploader {
	position: relative;
	display: block;
	padding: 5px 20px 5px 0px;
	border-bottom: 1px solid #000;
	color: #000;
	font-size: 14px;
	line-height: 18px;
	cursor: pointer;
	transition: font-size .3s, color .3s;

	&.is-pristine {
		color: #aaa;
		font-size: 12px;
		transition: font-size .3s, color .3s;
	}

	input[type="file"] {
		position: absolute;
		clip: rect(0 0 0 0);
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		border: 0;
	}

	span {
		display: block;
		padding-left: 30px;
		background: url('~@/assets/img/icon_file.svg') no-repeat left center;
		background-size: 20px auto;
	}

	&__canceler {
		position: absolute;
		top: 50%;
		right: 2px;
		width: 16px;
		height: 16px;
		transform: translateY(-50%);
		font-size: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 2px;
		outline: none;

		&:focus {
			outline: 2px solid rgba(0,0,0,0.3);
		}
	}
}
</style>
