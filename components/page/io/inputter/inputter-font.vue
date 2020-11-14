
<script>
import _inputter from './_inputter';
export default {
	mixins: [ _inputter ],
	methods: {
		/** @Override */
		submit: function(){
			let scope = this;
			let payload = { data: scope.data[0] };
			scope.$store.dispatch('font/updateAllParam', payload).then(function(){
				alert("設定値は正しく更新されました")
			});
		}
	}
}
</script>
