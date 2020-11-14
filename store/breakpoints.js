import { cloneDeep, findIndex, merge, compact } from 'lodash'
import dig from 'object-dig'
import defaultParams from './params.json'

export const state = () => ({
	// params: {},
	// defaultParams: {}
	params: cloneDeep(defaultParams.breakpoints.default),
	defaultParams: cloneDeep(defaultParams.breakpoints.default),
	basePoint: findIndex(defaultParams.breakpoints.default, function(obj) { return obj.config.isBase; }),
	initialBasePoint: findIndex(defaultParams.breakpoints.default, function(obj) { return obj.config.isBase; }),
	paramTemplate: {}
});

export const mutations = {
	setDefaultParam(state, payload) {
		state.params = cloneDeep(payload.data);
		state.defaultParams = cloneDeep(payload.data);
	},
	updateParamByKey(state, payload) {
		let data = payload.data;
		data.forEach((d) => {
			let value = d.value;
			let index = d.storeIndex;
			let keys = d.storeKey.split('-');
			let key = keys[keys.length - 1];
			let target = dig(state.params[index], ...keys.slice(0, -1));
			target[key] = value;
		});
	},
	updateAllParam (state, payload) {
		let data = payload.data;
		state.params = cloneDeep(data);
	},
	resetParam(state) {
		if (process.browser) localStorage.removeItem('rj-ds-params');
		state.params = cloneDeep(state.defaultParams);
	},
	addBreakpoint (state) {
		let data_temp = {}, interval = 200;

		// 最後のブレイクポイントの範囲をもとに、追加するブレイクポイントの最小値と最大値を求める
		let lastIndex = state.params.length > 1 ? state.params.length-1 : 0;
		let max = state.params[lastIndex].range.min + (interval-1);
		let min = max + 1;

		// 初期値を設定して、求めた最小値と最大値を代入する
		data_temp = cloneDeep(state.params[lastIndex]);
		data_temp.range.min = min;
		data_temp.range.max = null;

		state.params[lastIndex].range.max = max;
		state.params.push(data_temp);
	},
	removeBreakpoint(state, i) {
		let min = state.params[i].range.min;
		state.params.splice(i, 1);
		state.params[i].range.min = min;

		if (state.basePoint > state.params.length-1) {
			state.basePoint = state.params.length-1;
		} else if (state.basePoint === i || state.params.length === 1) {
			state.basePoint = i+1;
		}
	},
	overwriteParamByIndex(state, payload) {
		// let range = state.params[payload.overwriterIndex].range.min;
		// range += (state.params[payload.overwriterIndex].range.max) ? ' - ' + state.params[payload.overwriterIndex].range.max : '+';
		// let bool = confirm("このブレイクポイントの値で設定を上書きしてよろしいですか？\nSetting : " + range);
		// if (bool) {
			state.params[payload.targetIndex].modules = cloneDeep(state.params[payload.overwriterIndex].modules);
			state.params[payload.targetIndex].sectionMargin = cloneDeep(state.params[payload.overwriterIndex].sectionMargin);
		// }
	},
	changeBasePoint(state, i) {
		state.params[state.basePoint].config.isBase = false;
		state.params[i].config.isBase = true;
		state.basePoint = i;
	},
	resetBasePoint (state) {
		state.basePoint = state.initialBasePoint;
	}
}

export const actions = {
	async nuxtServerInit({ commit }) {
		// let response = await this.$axios.get('https://rj-design-simulator.firebaseio.com/default.json');
		//let response =
		//commit('setDefaultParam', { data: response.data });
	},
	updateModulesParam({ commit, state }, payload) {
		let data = payload.data;
		let index = data[0].storeIndex;
		let keys = data[0].storeKey.split('-');
		let key = keys[keys.length - 1];
		let ele = keys[keys.length - 2];
		let value = data[0].value;
		let params = state.params[index];

		// テキストの再計算
		if (key === 'fontSize' || key === 'jumpRate') {
			// ベースのフォントサイズとジャンプ率を取得
			let base = (ele === 'base' && key === 'fontSize') ? value : params.modules.base.fontSize;
			let jumpRate = (ele === 'base' && key === 'jumpRate') ? value : params.modules.base.jumpRate;
			jumpRate /= 100;

			// ジャンプ率が１未満だったら警告
			if (jumpRate < 1) {
				alert('ジャンプ率は100%以上の値を入力してください'); return;
			}

			// ベースのフォントサイズ以外が変更されたら、逆引きでベースの文字サイズを算出
			if (ele === 'h1') base = value / Math.pow(jumpRate, 4);
			if (ele === 'h2') base = value / Math.pow(jumpRate, 3);
			if (ele === 'h3') base = value / Math.pow(jumpRate, 2);
			if (ele === 'h4') base = value / Math.pow(jumpRate, 1);
			if (ele === 'lead') base = value / Math.pow(jumpRate, 1);
			if (ele === 'regular') base = value;
			if (ele === 'caption') base = value / 0.85;
			if (ele === 'note') base = value / (0.85 * 0.8);
			if (ele === 'button') base = value;

			// 逆引きで算出したベースのフォントサイズをもとに、各テキスト要素のフォントサイズを求める
			if (ele !== 'base') data.push({ storeIndex: index, storeKey: 'modules-base-fontSize', value: Math.floor(base) });
			if (ele !== 'h1') data.push({ storeIndex: index, storeKey: 'modules-h1-fontSize', value: Math.floor(base * Math.pow(jumpRate, 4)) });
			if (ele !== 'h2') data.push({ storeIndex: index, storeKey: 'modules-h2-fontSize', value: Math.floor(base * Math.pow(jumpRate, 3)) });
			if (ele !== 'h3') data.push({ storeIndex: index, storeKey: 'modules-h3-fontSize', value: Math.floor(base * Math.pow(jumpRate, 2)) });
			if (ele !== 'h4') data.push({ storeIndex: index, storeKey: 'modules-h4-fontSize', value: Math.floor(base * Math.pow(jumpRate, 1)) });
			if (ele !== 'lead') data.push({ storeIndex: index, storeKey: 'modules-h4-fontSize', value: Math.floor(base * Math.pow(jumpRate, 1)) });
			if (ele !== 'regular') data.push({ storeIndex: index, storeKey: 'modules-regular-fontSize', value: Math.floor(base) });
			if (ele !== 'caption') data.push({ storeIndex: index, storeKey: 'modules-caption-fontSize', value: Math.floor(base * 0.85) });
			if (ele !== 'note') data.push({ storeIndex: index, storeKey: 'modules-note-fontSize', value: Math.floor(base * 0.85 * 0.8) });
			if (ele !== 'button') data.push({ storeIndex: index, storeKey: 'modules-button-fontSize', value: Math.floor(base) });
		}
		commit('updateParamByKey', { data: data });
	},
	updateConfigParam({ commit, state }, payload) {
		let data = payload.data;
		let index = data[0].storeIndex;
		let keys = data[0].storeKey.split('-');
		let key = keys[keys.length - 1];
		let ele = keys[keys.length - 2];
		let value = data[0].value;
		let params = state.params[index];

		// グリッドの再計算
		if (key === 'gridCols') {
			let gridCols = value;
			let _containerWidth = params.config.containerWidth === 'none' ? params.range.min : params.config.containerWidth;
			let containerWidth = _containerWidth - (params.config.outerMargin * 2);
			let gridGap = params.config.gridGap;
			let gridWidth = (containerWidth - gridGap * (gridCols - 1)) / gridCols;
			let gridWidthRate = gridWidth / containerWidth;
			let gridGapRate = gridGap / containerWidth;
			data.push({ storeIndex: index, storeKey: 'config-gridWidth', value: gridWidth });

		} else if (key === 'gridGap') {
			let gridGap = value;
			let _containerWidth = params.config.containerWidth === 'none' ? params.range.min : params.config.containerWidth;
			let containerWidth = _containerWidth - (params.config.outerMargin * 2);
			let gridCols = params.config.gridCols;
			let gridWidth = (containerWidth - gridGap * (gridCols - 1)) / gridCols;
			let gridWidthRate = gridWidth / containerWidth;
			let gridGapRate = gridGap / containerWidth;
			data.push({ storeIndex: index, storeKey: 'config-gridWidth', value: gridWidth });
		} else if (key === 'outerMargin') {
			let outerMargin = value;
			let _containerWidth = params.config.containerWidth === 'none' ? params.range.min : params.config.containerWidth;
			let containerWidth = _containerWidth - (outerMargin * 2);
			let gridWidth = containerWidth * params.config.gridWidthRate;
			data.push({ storeIndex: index, storeKey: 'config-gridWidth', value: Math.ceil(gridWidth) });
		} else if (key === 'containerWidth' && value !== 'none') {
			let containerWidth = value - (params.config.outerMargin * 2);
			let gridWidth = containerWidth * params.config.gridWidthRate;
			let gridGap = containerWidth * params.config.gridGapRate;
			data.push({ storeIndex: index, storeKey: 'config-gridWidth', value: gridWidth });
			data.push({ storeIndex: index, storeKey: 'config-gridGap', value: gridGap });
		}
		commit('updateParamByKey', { data: data });
	},
	updateRangeParam({ commit, state }, payload) {
		let data = payload.data;
		let index = data[0].storeIndex;
		let keys = data[0].storeKey.split('-');
		let key = keys[keys.length - 1];
		let value = data[0].value;
		let prevParams = state.params[index-1];
		let nextParams = state.params[index+1];

		if (index === 0) {
			if (key === 'max') {
				// 直後のブレイクポイントの最大値よりも大きい値を設定されたら警告
				if (value >= nextParams.range.max && nextParams.range.max !== null) {
					alert('直後のブレイクポイントの最大値よりも小さい値を設定してください'); return;
				}
				// 直後のブレイクポイントの最大値を再設定
				data.push({ storeIndex: index+1, storeKey: 'range-min', value: value+1 });
			}
		} else if (index === state.params.length-1) {
			if (key === 'min') {
				// 直前のブレイクポイントの最小値よりも小さい値を設定されたら警告
				if (value <= prevParams.range.min) {
					alert('直前のブレイクポイントの最小値よりも大きい値を設定してください'); return;
				}
				// 直前のブレイクポイントの最小値を再設定
				data.push({ storeIndex: index-1, storeKey: 'range-max', value: value-1 });
			}
		} else {
			if (key === 'max') {
				// 直後のブレイクポイントの最大値よりも大きい値を設定されたら警告
				if (value >= nextParams.range.max && nextParams.range.max !== null) {
					alert('直後のブレイクポイントの最大値よりも小さい値を設定してください'); return;
				}
				// 直後のブレイクポイントの最大値を再設定
				data.push({ storeIndex: index+1, storeKey: 'range-min', value: value+1 });
			} else if (key === 'min') {
				// 直前のブレイクポイントの最小値よりも小さい値を設定されたら警告
				if (value <= prevParams.range.min) {
					alert('直前のブレイクポイントの最小値よりも大きい値を設定してください'); return;
				}
				// 直前のブレイクポイントの最小値を再設定
				data.push({ storeIndex: index-1, storeKey: 'range-max', value: value-1 });
			}
		}

		commit('updateParamByKey', { data: data });
	},
	updateFontParam({ commit, state }, payload){
		let data = [];
		for (let i=0; i <state.params.length; i++) {
			let obj = {};
			obj.storeIndex = i;
			obj = merge({}, obj, ...payload.data);
			data.push(obj);
		}
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
		commit('resetBasePoint');
	}
};

export const getters = {
	params: function (state) {
		return state.params;
	},
	basePoint: function (state) {
		return state.basePoint;
	},
	defaults: function(state) {
		return defaultParams.breakpoints;
	},
	parse: function (state) {

		/*　現在のスタイルを以下のオブジェクトの形式に変換して返すgetter関数
		[{
			"mediaQuery": "(min-width: lorem px) and (max-width: lorem px)",
			"range": {
				"min": "lorem value",
				"max": "lorem value",
			},
			"rules": [{
				"selector": "body",
				"rule": {
					"lorem margin": "lorem px",
					"lorem props": "lorem value"
				}
			}]
		}] */

		return function(params){
			let obj = params.map(function(param, i){
				let _obj = {};
				let magnification = param.config.magnification / 100;
				let containerWidthUnit = param.config.containerWidth !== 'none' ? param.config.containerWidthUnit : '';
				let containerMaxWidth = param.config.containerWidth !== 'none' ? param.config.containerWidth * magnification + containerWidthUnit : param.config.containerWidth;

				if (param.range.min !== null && param.range.max !== null) {
					_obj.mediaQuery = `(min-width: ${param.range.min}px) and (max-width: ${param.range.max}px)`;
 				} else if (param.range.max !== null) {
					_obj.mediaQuery = `(max-width: ${param.range.max}px)`;
				} else if (param.range.min !== null) {
					_obj.mediaQuery = `(min-width: ${param.range.min}px)`;
				}

				_obj.range = {};
				_obj.range.min = param.range.min;
				_obj.range.max = param.range.max;

				_obj.rules = [
					{
						"selector": '.mod-mainvisual',
						"rule": {
							"margin-bottom": `${ param.modules.h1.marginBottom * magnification }px`
						}
					},
					{
						"selector": '.mod-mainvisual .mod-mainvisual__inner',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"padding-top": `${ 100 * magnification }px`,
							"padding-bottom": `${ 100 * magnification }px`
						}
					},
					{
						"selector": '.mod-primaryHeader',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-bottom": `${ param.modules.h1.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.h1.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h1.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h1.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-secondaryHeader',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-top": `${ param.sectionMargin.L * magnification }px`,
							"margin-bottom": `${ param.modules.h2.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.h2.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h2.lineHeightRate / 100}`,
							"letter-spacing": `${ param.modules.h2.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-tertiaryHeader',
						"rule": {
							"max-width": `${ param.config.containerWidth * magnification }${ containerWidthUnit }`,
							"margin-top": `${ param.sectionMargin.M * magnification }px`,
							"margin-bottom": `${ param.modules.h3.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.h3.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h3.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h3.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-quaternaryHeader',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-top": `${ param.sectionMargin.S * magnification }px`,
							"margin-bottom": `${ param.modules.h4.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.h4.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h4.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h4.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-leadText',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-bottom": `${ param.modules.lead.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.lead.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.lead.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.lead.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-regularText',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-bottom": `${ param.modules.regular.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.regular.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.regular.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.regular.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-captionText',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-bottom": `${ param.modules.caption.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.caption.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.caption.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.caption.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-noteText',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"margin-bottom": `${ param.modules.note.marginBottom * magnification }px`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`,
							"font-size": `${ (param.modules.note.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.note.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.note.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-button',
						"rule": {
							"margin-top": `${ param.modules.button.marginBottom * magnification }px`,
							"font-size": `${ (param.modules.button.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.button.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.button.letterSpacing }px`
						}
					},
					{
						"selector": '.mod-buttonGroup',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`
						}
					},
					{
						"selector": '.mod-textGroup',
						"rule": {
							"max-width": containerMaxWidth,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`
						}
					}, {
						"selector": '.mod-textGroup:not(.mod-textGroup--single) .mod-textGroup__items',
						"rule": {
							"margin-right": `-${ param.config.gridGap / 2 }px`,
							"margin-left": `-${ param.config.gridGap / 2 }px`
						}
					}, {
						"selector": '.mod-textGroup.mod-textGroup--twoUp .mod-textGroup__item ',
						"rule": {
							"width": `calc(50% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px`
						}
					}, {
						"selector": '.mod-textGroup.mod-textGroup--threeUp .mod-textGroup__item',
						"rule": {
							"width": `calc(33.33% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px`
						}
					}, {
						"selector": '.mod-textGroup.mod-textGroup--fourUp .mod-textGroup__item',
						"rule": {
							"width": `calc(25% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px`
						}
					}, {
						"selector": '.mod-buttonGroup',
						"rule": {
							"margin-top": `${ param.modules.button.marginBottom * magnification }px`
						}
					}, {
						"selector": '.mod-mediaGroup ',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`
						}
					}, {
						"selector": '.mod-mediaGroup:not(.mod-mediaGroup--single) .mod-mediaGroup__items',
						"rule": {
							"margin-right": `-${ param.config.gridGap / 2 }px`,
							"margin-left": `-${ param.config.gridGap / 2 }px`
						}
					}, {
						"selector": '.mod-mediaGroup.mod-mediaGroup--twoUp .mod-mediaGroup__item',
						"rule": {
							"width": `calc(50% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-mediaGroup.mod-mediaGroup--threeUp .mod-mediaGroup__item',
						"rule": {
							"width": `calc(33.33% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-mediaGroup.mod-mediaGroup--fourUp .mod-mediaGroup__item',
						"rule": {
							"width": `calc(25% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-media .mod-media__inner',
						"rule": {
							"max-width": `${ param.config.containerWidth * magnification }${ containerWidthUnit }`
						}
					}, {
						"selector": '.mod-media .mod-media__vis',
						"rule": {
							"width": `calc(50% - ${ param.config.gridGap*.5 }px)`,
							"margin-right": `${ param.config.gridGap }px`
						}
					}, {
						"selector": '.mod-media.mod-media--rightWards .mod-media__vis',
						"rule": {
							"margin-right": "0",
							"margin-left": `${ param.config.gridGap }px`
						}
					}, {
						"selector": '.mod-media-v2 .mod-media-v2__vis',
						"rule": {
							"width": `${ param.config.actualGridWidth*2 + param.config.gridGap }px`,
							"margin-right": `${ param.config.gridGap }px`
						}
					}, {
						"selector": '.mod-cardGroup',
						"rule": {
							"max-width": `${ containerMaxWidth }`,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`
						}
					}, {
						"selector": '.mod-cardGroup:not(.mod-cardGroup--single) .mod-cardGroup__items',
						"rule": {
							"margin-right": `-${ param.config.gridGap / 2 }px!important`,
							"margin-left": `-${ param.config.gridGap / 2 }px!important`
						}
					}, {
						"selector": '.mod-cardGroup.mod-cardGroup--twoUp .mod-cardGroup__item',
						"rule": {
							"width": `calc(50% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-cardGroup.mod-cardGroup--threeUp .mod-cardGroup__item',
						"rule": {
							"width": `calc(33.33% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-cardGroup.mod-cardGroup--fourUp .mod-cardGroup__item',
						"rule": {
							"width": `calc(25% - ${ param.config.gridGap }px)`,
							"margin": `0 ${ param.config.gridGap / 2 }px 40px`
						}
					}, {
						"selector": '.mod-card .mod-card__vis',
						"rule": {
							"margin-bottom": `${ param.modules.visual.marginBottom * magnification }px`
						}
					}, {
						"selector": '.mod-card-v2 .mod-card-v2__vis',
						"rule": {
							"margin-bottom": `${ param.modules.visual.marginBottom * magnification }px`
						}
					}
				];

				// SP （BasePoint以下） でレイアウトが変化するモジュール
				if ( state.basePoint === 0 || i < state.basePoint ) {
					let _rules_sp = [
						{
							"selector": '.mod-mediaGroup .mod-mediaGroup__item:not(:last-child) ',
							"rule": {
								"margin-bottom": `${ param.sectionMargin.XS * magnification }px!important`
							}
						},
						{
							"selector": '.mod-cardGroup.break-sp .mod-cardGroup__items',
							"rule": {
								"margin-bottom": `-${ param.sectionMargin.XS * magnification }px`
							}
						},
						{
							"selector": '.mod-cardGroup .mod-cardGroup__item:not(:last-child)',
							"rule": {
								"margin-bottom": `${ param.sectionMargin.XS * magnification }px!important`
							}
						},
						{
							"selector": '.mod-cardGroup:not(.mod-cardGroup--single) .mod-cardGroup__item',
							"rule": {
								"margin-bottom": `${ param.sectionMargin.XS * magnification }px!important`
							}
						},
						{
							"selector": '.mod-media .mod-media__vis',
							"rule": {
								"margin-bottom": `${ param.modules.visual.marginBottom * magnification }px`
							}
						},
						{
							"selector": '.mod-media-v2 .mod-media-v2__vis',
							"rule": {
								"width": `${ param.config.actualGridWidth*2 + param.config.gridGap }px`,
								"margin-right": `${ param.config.gridGap }px`,
								"margin-bottom": `${ param.modules.visual.marginBottom * magnification }px`
							}
						},
						{
							"selector": '.mod-media-v2 .mod-media-v2__vis + .mod-media-v2__detail .mod-media-v2__texts>*:first-child',
							"rule": {
								"width": `calc((100% - ${ param.config.actualGridWidth*2 + param.config.gridGap*2 }px))`
							}
						},
						{
							"selector": '.mod-media-v2.mod-media-v2--rightWards .mod-media-v2__vis',
							"rule": {
								"margin-left": `${ param.config.gridGap }px`
							}
						},
						{
							"selector": '.mod-cardGroup:not(.mod-cardGroup--single):not(.break-sp) .mod-cardGroup__items',
							"rule": {
								"margin-left": `-${ param.config.gridGap*.5 }px`,
								"margin-right": `-${ param.config.gridGap*.5 }px`,
								"margin-bottom": `-${ param.sectionMargin.XS * magnification }px`
							}
						},
						{
							"selector": '.mod-cardGroup:not(.mod-cardGroup--single):not(.break-sp) .mod-cardGroup__item',
							"rule": {
								"width": `calc(50% - ${ param.config.gridGap }px)!important`,
								"margin-left": `${ param.config.gridGap*.5 }px`,
								"margin-right": `${ param.config.gridGap*.5 }px`
							}
						},
						{
							"selector": '.mod-card-v2 .mod-card-v2__vis',
							"rule": {
								"width": `calc(50% - ${ param.config.gridGap*.5 }px)`
							}
						},
						{
							"selector": '.mod-card-v2 .mod-card-v2__vis + .mod-card-v2__detail .mod-card-v2__texts>*:first-child',
							"rule": {
								"width": `calc(50% - ${ param.config.gridGap*.5 }px)`
							}
						}
					];

					// 同じセレクタをマージ
					_rules_sp.forEach(function(ele, i){
						let duplicatedIndex = findIndex(_obj.rules, function(o) {
							return o.selector === ele.selector;
						});

						if (duplicatedIndex !== -1) {
							_obj.rules[duplicatedIndex].rule = merge(_obj.rules[duplicatedIndex].rule, ele.rule);
							_rules_sp[i] = null;
						}
					});
					_obj.rules = _obj.rules.concat(compact(_rules_sp));
				}

				return _obj;
			});

			return obj;
		}
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
