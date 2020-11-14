export const state = () => ({
	isShown: false
});

export const mutations = {
	show (state) {
		state.isShown = true;
	},
	close (state) {
		state.isShown = false;
	},
	toggle (state) {
		state.isShown = !state.isShown;
	}
}

export const actions = {
};

export const getters = {
	isShown : function (state) {
		return state.isShown;
	},
	parse: function (state) {
		return function(params){

			/*　現在のスタイルを以下のオブジェクトの形式に変換して返すgetter関数
			[{
				"rules": [{
					"selector": "lorem selector",
					"rule": {
						"lorem prop": "lorem value",
						"lorem prop": "lorem value",
					}
				}, {
					"selector": "lorem selector",
					"rule": {
						"lorem prop": "lorem value",
						"lorem prop": "lorem value",
					}
				}]
			}] */

			let obj = params.map(function(param, i){
				let _obj = {};
				let magnification = param.config.magnification / 100;
				let containerWidthUnit = param.config.containerWidth !== 'none' ? param.config.containerWidthUnit : '';
				let containerMaxWidth = param.config.containerWidth !== 'none' ? param.config.containerWidth * magnification + containerWidthUnit : param.config.containerWidth;
				let breakpoint;

				if (param.range.min !== null && param.range.max !== null) {
					_obj.mediaQuery = `(min-width: ${param.range.min}px) and (max-width: ${param.range.max}px)`;
					breakpoint = `${param.range.min} - ${param.range.max}`;
 				} else if (param.range.max !== null) {
					_obj.mediaQuery = `(max-width: ${param.range.max}px)`;
					breakpoint = `- ${param.range.min}`;
				} else if (param.range.min !== null) {
					_obj.mediaQuery = `(min-width: ${param.range.min}px)`;
					breakpoint = `${param.range.min} +`;
				}

				_obj.rules = [
					{
						"selector": '.p-layout-grid .p-layout-grid__inner',
						"rule": {
							"max-width": containerMaxWidth,
							"padding-left": `${ param.config.outerMargin * magnification }px`,
							"padding-right": `${ param.config.outerMargin * magnification }px`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__gaps',
						"rule": {
							"padding-left": `${ param.config.actualGridWidth }px`,
							"padding-right": `${ param.config.actualGridWidth }px`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__containerWidth span:after',
						"rule": {
							"content": `"${ breakpoint }"`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__breakpoint span:after',
						"rule": {
							"content": `"${ breakpoint }"`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__gap',
						"rule": {
							"width": `${ param.config.gridGap }px`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__gap span:after',
						"rule": {
							"content": `"${ param.config.gridGap }"`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__outerMargin',
						"rule": {
							"width": `${ param.config.outerMargin * magnification }px`
						}
					}, {
						"selector": '.p-layout-grid .p-layout-grid__outerMargin--right span:after ',
						"rule": {
							"content": `"${ param.config.outerMargin * magnification }"`
						}
					}
				];

				return _obj;
			});

			return obj;
		}
	},
	stringify: function(state) {
		return function(obj, fn){
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
					_str += `${_selector} { ${__rule} }`;
				});

				str += (_mediaQuery !== void 0) ? `@media screen and ${_mediaQuery} { ${_str} }` : _str;
			});

			return str;
		}
	}
};
