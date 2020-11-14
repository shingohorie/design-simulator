<template>
	<tr class="p-row-module" :class="el">
		<th>{{ title }}</th>
		<td>{{ param.fontSize * (config.magnification / 100) }}</td>
		<td>{{ param.lineHeightRate / 100 | fixed }}</td>
		<td>{{ param.marginBottom * (config.magnification / 100) }}</td>
		<td>
			<module-renderer :el="el"><slot /></module-renderer>
		</td>
	</tr>
</template>

<script>
import ModuleRenderer from "./renderer/module-renderer"

export default {
	props: ["el", "title", "param", "config"],
	components: {
		"module-renderer": ModuleRenderer
	},
	filters: {
		fixed: function(value) {
			return Math.round(value * 10) / 10;
		}
	}
};
</script>
