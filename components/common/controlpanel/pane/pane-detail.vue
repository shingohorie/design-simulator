<template>
	<div class="l-setting">
		<div class="l-setting__body">
			<div class="l-setting__menu">
				<div class="l-breakpoints">
					<ul class="l-breakpoints__items">
						<li class="l-breakpoints__item" v-for="(param, i) in params"
							:key="i"
							:class="{
								'is-active': i === currentBreakpoint,
								'is-base': param.config.isBase
							}"
						>
							<a href="" @click.prevent="switchBreakpoint($event, i)" v-if="param.range.max">{{param.range.min}} &mdash; {{param.range.max}}</a>
							<a href="" @click.prevent="switchBreakpoint($event, i)" v-else>{{param.range.min}} &plus;</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="l-setting__main">
				<transition enter-active-class="animated fadeIn" v-for="(param, i) in params" :key="i">
					<div class="l-setting__subpane" v-show="i == currentBreakpoint">

						<div class="l-setting__header">
							<p class="l-setting__primaryHeader" v-if="param.range.max">Setting : {{param.range.min}} - {{param.range.max}}</p>
							<p class="l-setting__primaryHeader" v-else>Setting : {{param.range.min}} +</p>

							<div class="l-setting__overwriter">
								<div class="c-selector">
									<div class="c-selector__input">
										<select @change="overwrite" v-model="overwriter" :data-index="i">
											<option value="">このブレイクポイントの値で設定を上書きする</option>
											<option :value="j" v-for="(param, j) in params" :key="j" :disabled="j==i">
												<template v-if="param.range.max">{{param.range.min}} - {{param.range.max}}</template>
												<template v-else>{{param.range.min}} +</template>
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<p class="l-setting__secondaryHeader">テキスト設定</p>

						<setting-typo :param="param" :index="i" />

						<p class="l-setting__secondaryHeader">セクション設定</p>

						<setting-section :param="param" :index="i" />

					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import settingTypo from "./setting/setting-detail-typo"
import settingSection from "./setting/setting-detail-section"
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
	data: function(){
		return {
			currentBreakpoint: 0,
			overwriter: ""
		}
	},
	components: {
		"setting-typo": settingTypo,
		"setting-section": settingSection
	},
	methods: {
		...mapMutations("controlpanel", ["close"]),
		overwrite: function(e){
			let scope = this;

			let targetIndex = parseFloat(e.target.getAttribute('data-index'));
			let overwriterIndex = parseFloat(this.overwriter);

			let range = scope.params[overwriterIndex].range.min;
			range += (scope.params[overwriterIndex].range.max) ? ' - ' + scope.params[overwriterIndex].range.max : '+';

			let isConfirmed = confirm("このブレイクポイントの値で設定を上書きしてよろしいですか？\nSetting : " + range);

			if (overwriterIndex !== '') {
				let payload = {
					targetIndex: targetIndex,
					overwriterIndex: overwriterIndex
				}
				if (isConfirmed) this.$store.commit("breakpoints/overwriteParamByIndex", payload);
				this.overwriter = "";
			}
		},
		switchBreakpoint: function(e, i){
			this.currentBreakpoint = i;
		}
	},
	computed: {
		...mapGetters("breakpoints", ["params", "basePoint"])
	}
};
</script>

<style lang="scss">
.l-breakpoints {
	position: sticky;
	position: -webkit-sticky;
	left: 0;
	top: 60px;

	&__items {
		padding: 0 32px;
	}

	&__item {
		margin-bottom: 24px;
		font-size: 1.6rem;
		line-height: 1;

		a {
			display: block;
			padding: 12px 17px;
			color: #fff;

			&:hover {
				color: inherit;
			}
		}

		&.is-active, &:hover {
			a {
				background: #4F4F4F;
			}
		}

		&.is-base {
			a {
				&:after {
					content: 'Base';
					display: inline-block;
					width: 30px;
					margin-left: 10px;
					font-size: 1.1rem;
					line-height: 15px;
					color: #A0A0A0;
					border: 1px solid #585858;
					border-radius: 2px;
					text-align: center;
				}
			}

			&.is-active, &:hover {
				a {
					&:after {
						color: #a7a7a7;
						border-color: #a7a7a7;;
					}
				}
			}
		}
	}
}
</style>
