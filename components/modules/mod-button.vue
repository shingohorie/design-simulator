<template>
	<p class="mod-button">
		<a :href="href" :target="target">
			<span><slot/></span>
		</a>
	</p>
</template>

<script>
export default {
	props: ['href', 'target']
}
</script>
