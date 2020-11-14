import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as __store__ from '@/store/index'
import StylesVue from '@/components/common/styles/styles'
import defaultParams from './paramsMockData.json'

const localVue = createLocalVue()
localVue.use(Vuex)

// CSS文字列から改行と空白を削除する関数
const minify = (str) => str.replace(/\r?\n|\s|\t/g,"");

describe('components/common/styles/styles.vue', () => {
	let wrapper, store;

	beforeEach(() => {
		wrapper = null;
		store = new Vuex.Store(__store__)
		store.commit('setDefaultParam', { data: defaultParams.default });
		wrapper = shallowMount(StylesVue, { store, localVue })
	});

	// 初期値が描画されているかテスト
	it('初期値が描画されている', () => {
		// サイト最大幅の初期値
		let str = minify(wrapper.text());
		expect(str).toMatch(".ds-preview-layout{min-width:1280px;}");
	})

	// 変更された値が描画されているかテスト
	it('変更された値が描画されている', (done) => {
		// サイト最大幅の値を2000に変更
		store.dispatch('updateParam', {
			data: [{
				storeKey: 'pc-config-containerWidth',
				value: 2000
			}]
		});
		wrapper.vm.$nextTick(() => {
			let str = minify(wrapper.text());
			expect(str).toMatch(".ds-preview-layout{min-width:2000px;}");
			done();
		})
	})
});
