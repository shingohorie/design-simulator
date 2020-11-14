<script>
export default {
	props: ["el"],

	render(h) {
		let scope = this, element;
		switch (scope.el) {
			case "h1":
				element = "mod-primary-header";
				break;
			case "h2":
				element = "mod-secondary-header";
				break;
			case "h3":
				element = "mod-tertiary-header";
				break;
			case "h4":
				element = "mod-quaternary-header";
				break;
			case "lead":
				element = "mod-lead-text";
				break;
			case "regular":
				element = "mod-regular-text";
				break;
			case "caption":
				element = "mod-caption-text";
				break;
			case "note":
				element = "mod-note-text";
				break;
			case "button":
				element = "mod-button";
				break;
		}
		return h(element, {}, this.$slots.default);
	}
};
</script>
