<script>
export default {
	props: ["el", "classAdd"],
	render(h) {
		let scope = this;
		let element;
		switch (scope.el) {
			case 'quaternaryHeader':
					element = 'mod-quaternary-header';
					break;
			case 'leadText':
					element = 'mod-lead-text';
					break;
			case 'regularText':
					element = 'mod-regular-text';
					break;
			case 'captionText':
					element = 'mod-caption-text';
					break;
			case 'noteText':
					element = 'mod-note-text';
					break;
		}
		return h(element, { class: this.classAdd, props: { innerModule: 'true' }}, this.$slots.default)
	}
}
</script>
