<script>
export default {
	render(h) {
		return h("style", { id: this.id }, this.$slots.default);
	}
};
</script>
