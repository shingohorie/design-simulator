import Vue from 'vue'

import primaryHeader from "@/components/modules/mod-primary-header.vue";
import secondaryHeader from "@/components/modules/mod-secondary-header.vue";
import tertiaryHeader from "@/components/modules/mod-tertiary-header.vue";
import quaternaryHeader from "@/components/modules/mod-quaternary-header.vue";
import leadText from "@/components/modules/mod-lead-text.vue";
import regularText from "@/components/modules/mod-regular-text.vue";
import captionText from "@/components/modules/mod-caption-text.vue";
import noteText from "@/components/modules/mod-note-text.vue";
import textGroup from "@/components/modules/mod-text-group.vue";

import mainvisual from "@/components/modules/mod-mainvisual.vue";
import buttonGroup from "@/components/modules/mod-button-group.vue";
import button from "@/components/modules/mod-button.vue";
import mediaGroup from "@/components/modules/mod-media-group.vue";
import media from "@/components/modules/mod-media.vue";
import mediaGroupV2 from "@/components/modules/mod-media-group-v2.vue";
import mediaV2 from "@/components/modules/mod-media-v2.vue";
import cardGroup from "@/components/modules/mod-card-group.vue";
import card from "@/components/modules/mod-card.vue";
import cardGroupV2 from "@/components/modules/mod-card-group-v2.vue";
import cardV2 from "@/components/modules/mod-card-v2.vue";

Vue.component('mod-primary-header', primaryHeader);
Vue.component('mod-secondary-header', secondaryHeader);
Vue.component('mod-tertiary-header', tertiaryHeader);
Vue.component('mod-quaternary-header', quaternaryHeader);
Vue.component('mod-lead-text', leadText);
Vue.component('mod-regular-text', regularText);
Vue.component('mod-caption-text', captionText);
Vue.component('mod-note-text', noteText);
Vue.component('mod-text-group', textGroup);

Vue.component('mod-mainvisual', mainvisual);
Vue.component('mod-button-group', buttonGroup);
Vue.component('mod-button', button);
Vue.component('mod-media-group', mediaGroup);
Vue.component('mod-media', media);
Vue.component('mod-media-group-v2', mediaGroupV2);
Vue.component('mod-media-v2', mediaV2);
Vue.component('mod-card-group', cardGroup);
Vue.component('mod-card', card);
Vue.component('mod-card-group-v2', cardGroupV2);
Vue.component('mod-card-v2', cardV2);
