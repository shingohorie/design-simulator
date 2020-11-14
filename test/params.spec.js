import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as __store__ from '@/store/index'
import defaultParams from './paramsMockData.json'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/index.js', () => {
	let store

	beforeEach(() => {
		store = new Vuex.Store(__store__);
		store.commit('setDefaultParam', { data: defaultParams.default });
	})

	describe('getters', () => {
		// getterの確認
		test('getterで取得できているか確認', () => {
			let paramsPC = store.getters['paramsPC'];
			let paramsSP = store.getters['paramsSP'];
			expect(paramsPC.base.fontSize).toBe(15)
			expect(paramsSP.base.fontSize).toBe(14)
		})
	})

	describe('actions', () => {

		// ベースのフォントサイズを変更すると、正しくフォントサイズが変化するかテスト
		test('ベースのフォントサイズを変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-base-fontSize',
					value: 30
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.h1.fontSize).toBe(85)
			expect(_params.h2.fontSize).toBe(65)
			expect(_params.h3.fontSize).toBe(50)
			expect(_params.h4.fontSize).toBe(39)
			expect(_params.regular.fontSize).toBe(30)
			expect(_params.caption.fontSize).toBe(25)
			expect(_params.note.fontSize).toBe(20)
			expect(_params.button.fontSize).toBe(30)
		});

		// ベース以外のフォントサイズを変更すると、正しくフォントサイズが変化するかテスト
		test('ベース以外のフォントサイズを変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-h1-fontSize',
					value: 30
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.h1.fontSize).toBe(30)
			expect(_params.h2.fontSize).toBe(23)
			expect(_params.h3.fontSize).toBe(17)
			expect(_params.h4.fontSize).toBe(13)
			expect(_params.base.fontSize).toBe(10)
			expect(_params.regular.fontSize).toBe(10)
			expect(_params.caption.fontSize).toBe(8)
			expect(_params.note.fontSize).toBe(7)
			expect(_params.button.fontSize).toBe(10)
		});

		// ジャンプ率を変更すると、正しくフォントサイズが変化するかテスト
		test('ジャンプ率を変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-config-jumpRate',
					value: 200
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.h1.fontSize).toBe(240)
			expect(_params.h2.fontSize).toBe(120)
			expect(_params.h3.fontSize).toBe(60)
			expect(_params.h4.fontSize).toBe(30)
			expect(_params.regular.fontSize).toBe(15)
			expect(_params.caption.fontSize).toBe(12)
			expect(_params.note.fontSize).toBe(10)
			expect(_params.button.fontSize).toBe(15)
		});

		// サイト最大幅を変更すると、正しくグリッドが変化するかテスト
		test('サイト最大幅を変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-config-containerWidth',
					value: 1000
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.config.gridWidth).toBe(54.19354848)
			expect(_params.config.gridGap).toBe(27.87096768)
		});

		// コラムワイドを変更すると、正しくグリッドが変化するかテスト
		test('コラムワイドを変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-config-gridWidth',
					value: 50
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.config.gridGap).toBe(58.18181818181818)
		});

		// ガターワイドを変更すると、正しくグリッドが変化するかテスト
		test('ガターワイドを変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-config-gridGap',
					value: 50
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.config.gridWidth).toBe(57.5)
		});

		// 外側マージンを変更すると、正しくグリッドが変化するかテスト
		test('外側マージンを変更する', function () {
			store.dispatch('updateParam', {
				data: [{
					storeKey: 'pc-config-outerMargin',
					value: 50
				}]
			});
			let _params = store.getters['paramsPC'];
			expect(_params.config.gridWidth).toBe(66.61290334)
			expect(_params.config.gridGap).toBe(34.25806444)
		});

	})
})
