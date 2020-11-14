<script>
export default {
	props: ["el"],
	render(h) {
		let scope = this;
		let marginClass = "p-cell-margin p-cell-margin--";
		switch (this.el) {
			case "h1":
				marginClass += "h1";
				break;
			case "h2":
				marginClass += "h2";
				break;
			case "h3":
				marginClass += "h3";
				break;
			case "h4":
				marginClass += "h4";
				break;
			case "lead":
				marginClass += "lead";
				break;
			case "regular":
				marginClass += "regular";
				break;
			case "caption":
				marginClass += "caption";
				break;
			case "note":
				marginClass += "note";
				break;
			case "button":
				marginClass += "button";
				break;
		}
		return h("span", { class: marginClass }, this.$slots.default);
	}
};
</script>
