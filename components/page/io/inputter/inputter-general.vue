
<script>
import _inputter from './_inputter';
export default {
	mixins: [ _inputter ],
	methods: {
		/** @Override */
		submit: function(){
			let scope = this;
			let payload = { data: scope.data };
			scope.$store.dispatch('breakpoints/updateAllParam', payload).then(function(){
				alert("設定値は正しく更新されました")
			});
		}
	}
}
</script>
