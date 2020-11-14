<template>
	<div class="p-switcher">
		<div class="p-switcher__controllers">
			<p class="p-switcher__controller" :class="{'is-active': currentTab === i}" v-for="(param, i) in params" :key="i">
				<a href="" @click.prevent="switchTab($event, i)" v-if="param.range.max">{{param.range.min}} &mdash; {{param.range.max}}</a>
				<a href="" @click.prevent="switchTab($event, i)" v-else>{{param.range.min}} &plus;</a>
			</p>
		</div>

		<transition enter-active-class="animated fadeIn" v-for="(param, i) in params" :key="i">
			<div class="p-switcher__pane" v-show="currentTab === i">
				<pane :param="param" :index="i"/>
			</div>
		</transition>
	</div>
</template>

<script>
import Pane from "@/components/page/typography/pane"
import { mapMutations, mapActions, mapGetters  } from 'vuex'

export default {
	name: 'typography',
	layout: 'default',
	head () {
		return {
			title: 'Text List',
			meta: [
				{ hid: 'description', name: 'description', content: 'Text List' }
			]
		}
	},
	data: function () {
		return {
			currentTab: 0
		}
	},
	created: function() {
		this.currentTab = this.basePoint;
	},
	components: {
		'pane': Pane
	},
	methods: {
		switchTab: function(e, i) {
			this.currentTab = i;
		}
	},
	computed: {
		...mapGetters("breakpoints", ["params", "basePoint"])
	},
	watch: {
		params: {
			handler: function (newParam, oldParam) {
				if (this.currentTab > newParam.length-1) this.currentTab = newParam.length-1;
			},
			deep: true
		}
	}
}
</script>

<style lang="scss">
.p-switcher {
	margin-top: 50px;
	padding: 0 20px;

	&__controllers {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		max-width: 820px;
		margin: 0 auto 100px;
	}

	&__controller {
		max-width: 300px;
		margin: 0 8px;
		text-align: center;

		> a {
			display: block;
			height: 100%;
			padding: 8px 12px;
			font-weight: 700;
			font-size: 1.4rem;
			color: #bbb;
			// color: #000;
			transition: background-size .3s;

			&:hover {
				color: inherit;
			}
		}

		&:nth-child(odd) {
			a:hover, &.is-active a {
				color: #000;
				// background: linear-gradient(to right, #FF5B00, #2D0CC1) no-repeat left bottom;
				background: linear-gradient(to right, #3A51FF, #36C6A6) no-repeat left bottom;
				background-size: 100% 2px;
			}
		}

		&:nth-child(even) {
			a:hover, &.is-active a {
				color: #000;
				// background: linear-gradient(to left, #FF5B00, #2D0CC1) no-repeat left bottom;
				background: linear-gradient(to right, #36C6A6, #3A51FF) no-repeat left bottom;
				background-size: 100% 2px;
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.p-switcher {
		margin-top: 40px;

		&__controllers {
			margin-bottom: 40px;
		}

		&__controller {
			> a {
				font-size: 1.2rem;
			}
		}
	}
}
</style>


