import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as __store__ from '@/store/index'
import InputterVue from '@/components/common/controlpanel/inputter'
import defaultParams from './paramsMockData.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/common/controlpanel/inputter.vue', () => {
	let wrapper, store;

	beforeEach(() => {
		wrapper = null;
		// サイト最大幅を例にする
		let propsData = {
			'store-key': 'pc-config-containerWidth',
			'param': 1280,
			'unit': 'px',
			'readonly': null,
			'note': null
		};
		store = new Vuex.Store(__store__)
		store.commit('setDefaultParam', { data: defaultParams.default });
		wrapper = shallowMount(InputterVue, { propsData, store, localVue })
	});

	// propsに渡された初期値がvalueに設定されているかテスト
	it('propsに渡された初期値がvalueに設定されている', () => {
		let val = wrapper.find('input').element.value;
		expect(val).toBe('1280');
	})

	// propsが変更された時にvalueに反映されているかテスト
	it('propsが変更された時にvalueに反映されている', (done) => {
		wrapper.setProps({ param: 2000 })
		wrapper.vm.$nextTick(() => {
			let val = wrapper.find('input').element.value;
			expect(val).toBe('2000');
			done();
		})
	})

	// keyupにバインドした処理が実行されるかテスト
	it('keyupにバインドした処理が実行される', () => {
		let stub = jest.fn();
		wrapper.setMethods({ updateParam: stub });
    	wrapper.find('input').trigger('keyup')
		expect(stub).toHaveBeenCalled();
	})

	// ユーザーの入力した値がvalueに反映されているかテスト
	it('ユーザーの入力した値がvalueに反映されている', (done) => {
		wrapper.find('input').setValue('2000')
    	wrapper.find('input').trigger('keyup')
		wrapper.vm.$nextTick(() => {
			let val = wrapper.find('input').element.value;
			expect(val).toBe('2000')
			done();
		})
	})
});
