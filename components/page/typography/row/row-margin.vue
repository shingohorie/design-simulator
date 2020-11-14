<template>
	<tr class="p-row-margin" :class="el">
		<th>&nbsp;</th>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
		<td>
			<margin-renderer :el="el">margin-bottom: {{ param.marginBottom }}px</margin-renderer>
		</td>
	</tr>
</template>

<script>
import MarginRenderer from "./renderer/margin-renderer"

export default {
	props: ["el", "param"],
	components: {
		"margin-renderer": MarginRenderer
	},
	filters: {
		fixed: function(value){
			return Math.round(value * 10) / 10;
		}
	}
};
</script>
