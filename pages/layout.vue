<template>
	<pane />
</template>

<script>
import Pane from "@/components/page/layout/pane.vue"
import { mapMutations, mapGetters  } from 'vuex'

export default {
	name: 'layout',
	layout: 'default',
	head () {
		return {
			title: 'Sample Page',
			meta: [
				{ hid: 'description', name: 'description', content: 'Sample Page' }
			]
		}
	},
	components: {
		'pane' : Pane
	}
}
</script>
