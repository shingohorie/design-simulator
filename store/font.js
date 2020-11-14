import { cloneDeep } from 'lodash'
import defaultParams from './params.json'

export const state = () => ({
	// params: {},
	// defaultParams: {}
	params: cloneDeep(defaultParams.font.default),
	defaultParams: cloneDeep(defaultParams.font.default),
	choices: cloneDeep(defaultParams.font.choices)
});

export const mutations = {
	setDefaultParam(state, payload) {
		state.params = cloneDeep(payload.data);
		state.defaultParams = cloneDeep(payload.data);
	},
	updateParamByKey(state, payload) {
		let data = payload.data;
		data.forEach(function(d){
			let key = d.storeKey;
			let value = d.value;
			state.params[key] = value;
		});
	},
	updateAllParam(state, payload){
		let data = payload.data;
		state.params = cloneDeep(data);
	},
	resetParam(state) {
		state.params = cloneDeep(state.defaultParams);
	}
}

export const actions = {
	async nuxtServerInit({ commit }) {
		// let response = await this.$axios.get('https://rj-design-simulator.firebaseio.com/font.json');
		//let response =
		//commit('setDefaultParam', { data: response.data });
	},
	updateParam({ commit, state }, payload){
		let data = payload.data;
		commit('updateParamByKey', { data: data });
	},
	updateAllParam({ commit, state }, payload){
		let data = payload.data;
		return new Promise(function(resolve, reject){
			commit('updateAllParam', { data: data });
			resolve();
		});
	},
	resetParam({ commit }) {
		commit('resetParam');
	}
};

export const getters = {
	params: function (state) {
		return state.params;
	},
	choices: function (state) {
		return state.choices;
	},
	parse: function (state) {

		/*　現在のスタイルを以下のオブジェクトの形式に変換して返すgetter関数
		[{
			"rules": [{
				"selector": "body",
				"rule": {
					"font-family": "lorem family",
					"font-feature-settings": "lorem feature settings"
				}
			}]
		}] */

		let obj = [];
		let families = [];
		let family = state.choices.family[state.params.family];
		let feature = state.choices.feature[state.params.feature];
		let yakuhanjp = state.params.yakuhanjp;

		let root = obj[0] = {};
		let _rules = root['rules'] = [{}];
		let _rule = _rules[0]['rule'] = {};
		let _selector = _rules[0]['selector'] = null;

		if (feature !== 'normal') feature = '\"' + feature + '\"';
		if (yakuhanjp) families.push('\"YakuHanJP\"');

		switch(family) {
			case 'Noto Sans JP':
				families.push('\"' + family + '\"');
				families.push('sans-serif');
				break;
			case 'ヒラギノ角ゴProN':
				families.push('\"Hiragino Kaku Gothic ProN\"');
				families.push('\"' + family + '\"');
				families.push('sans-serif');
				break;
			case '游ゴシック':
				families.push('YuGothic');
				families.push('\"' + family + '\"');
				families.push('sans-serif');
				break;
			case 'メイリオ':
				families.push('Meiryo');
				families.push('\"' + family + '\"');
				families.push('sans-serif');
				break;
			default:
				families.push(family);
				break;
		}
		_selector = 'body';
		_rule['font-family'] = families.join(', ');
		_rule['font-feature-settings'] = feature;

		return obj;
	},
	stringify: function(state) {
		return function(obj){
			let str = '';

			obj.forEach(function(ele){
				let _str = '';
				let _mediaQuery = ele.mediaQuery;

				ele.rules.forEach(function(rule){
					let _selector = rule.selector;
					let _rule = rule.rule;
					let __rule = Object.keys(_rule).map(function(key){
						return `${key}: ${_rule[key]}; `;
					}).join('');
					_str += `${_selector} { ${__rule} }`
				});

				str += (_mediaQuery !== void 0) ? `@media screen and ${_mediaQuery} { ${_str} }` : _str;
			});

			return str;
		}
	}
};
