export const state = () => ({
});

export const mutations = {
}

export const actions = {
};

export const getters = {
	parse: function (state) {
		return function(params){

			/*　現在のスタイルを以下のオブジェクトの形式に変換して返すgetter関数
			[{
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

			let obj = params.map(function(param, i){
				let _obj = {};
				let magnification = param.config.magnification / 100;

				// 行間からフォントサイズを引いた差分を求める
				let fat_h1 = ((param.modules.h1.fontSize * magnification) * (param.modules.h1.lineHeightRate/100) - (param.modules.h1.fontSize * magnification)) * .5;
				let fat_h2 = ((param.modules.h2.fontSize * magnification) * (param.modules.h2.lineHeightRate/100) - (param.modules.h2.fontSize * magnification)) * .5;
				let fat_h3 = ((param.modules.h3.fontSize * magnification) * (param.modules.h3.lineHeightRate/100) - (param.modules.h3.fontSize * magnification)) * .5;
				let fat_h4 = ((param.modules.h4.fontSize * magnification) * (param.modules.h4.lineHeightRate/100) - (param.modules.h4.fontSize * magnification)) * .5;
				let fat_lead = ((param.modules.lead.fontSize * magnification) * (param.modules.lead.lineHeightRate/100) - (param.modules.lead.fontSize * magnification)) * .5;
				let fat_regular = ((param.modules.regular.fontSize * magnification) * (param.modules.regular.lineHeightRate/100) - (param.modules.regular.fontSize * magnification)) * .5;
				let fat_caption = ((param.modules.caption.fontSize * magnification) * (param.modules.caption.lineHeightRate/100) - (param.modules.caption.fontSize * magnification)) * .5;
				let fat_note = ((param.modules.note.fontSize * magnification) * (param.modules.note.lineHeightRate/100) - (param.modules.note.fontSize * magnification)) * .5;

				_obj.range = {};
				_obj.range.min = param.range.min;
				_obj.range.max = param.range.max;

				_obj.rules = [
					{
						"selector": '.p-cell-margin.p-cell-margin--h1',
						"rule": {
							"height": `${ param.modules.h1.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--h2',
						"rule": {
							"height": `${ param.modules.h2.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--h3',
						"rule": {
							"height": `${ param.modules.h3.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--h4',
						"rule": {
							"height": `${ param.modules.h4.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--lead',
						"rule": {
							"height": `${ param.modules.lead.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--regular',
						"rule": {
							"height": `${ param.modules.regular.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--caption',
						"rule": {
							"height": `${ param.modules.caption.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--note',
						"rule": {
							"height": `${ param.modules.note.marginBottom * magnification }px`
						}
					}, {
						"selector": '.p-cell-margin.p-cell-margin--button',
						"rule": {
							"height": `${ param.modules.button.marginBottom * magnification }px`
						}
					}, {
						"selector": '.mod-primaryHeader',
						"rule": {
							"font-size": `${ (param.modules.h1.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h1.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h1.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_h1 }px, transparent ${ fat_h1 }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_h1 }px, transparent ${ fat_h1 }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-primaryHeader:before',
						"rule": {
							"content": `"${ Math.round(fat_h1 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-primaryHeader:after',
						"rule": {
							"content": `"${ Math.round(fat_h1 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-secondaryHeader',
						"rule": {
							"font-size": `${ (param.modules.h2.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h2.lineHeightRate / 100}`,
							"letter-spacing": `${ param.modules.h2.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_h2 }px, transparent ${ fat_h2 }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${fat_h2 }px, transparent ${ fat_h2 }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-secondaryHeader:before',
						"rule": {
							"content": `"${ Math.round(fat_h2 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-secondaryHeader:after',
						"rule": {
							"content": `"${ Math.round(fat_h2 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-tertiaryHeader',
						"rule": {
							"font-size": `${ (param.modules.h3.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h3.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h3.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_h3 }px, transparent ${ fat_h3 }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_h3 }px, transparent ${ fat_h3 }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-tertiaryHeader:before',
						"rule": {
							"content": `"${ Math.round(fat_h3 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-tertiaryHeader:after',
						"rule": {
							"content": `${ Math.round(fat_h3 * 10) / 10 }`
						}
					}, {
						"selector": '.mod-quaternaryHeader',
						"rule": {
							"font-size": `${ (param.modules.h4.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.h4.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.h4.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_h4 }px, transparent ${ fat_h4 }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_h4 }px, transparent ${ fat_h4 }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-quaternaryHeader:before',
						"rule": {
							"content": `"${ Math.round(fat_h4 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-quaternaryHeader:after',
						"rule": {
							"content": `"${ Math.round(fat_h4 * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-leadText',
						"rule": {
							"font-size": `${ (param.modules.lead.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.lead.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.lead.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_lead }px, transparent ${ fat_lead }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_lead }px, transparent ${ fat_lead }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-leadText:before',
						"rule": {
							"content": `"${ Math.round(fat_lead * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-leadText:after',
						"rule": {
							"content": `"${ Math.round(fat_lead * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-regularText',
						"rule": {
							"font-size": `${ (param.modules.regular.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.regular.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.regular.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_regular }px, transparent ${ fat_regular }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_regular }px, transparent ${ fat_regular }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-regularText:before',
						"rule": {
							"content": `"${ Math.round(fat_regular * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-regularText:after',
						"rule": {
							"content": `"${ Math.round(fat_regular * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-captionText',
						"rule": {
							"font-size": `${ (param.modules.caption.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.caption.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.caption.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_caption }px, transparent ${ fat_caption }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_caption }px, transparent ${ fat_caption }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-captionText:before',
						"rule": {
							"content": `"${ Math.round(fat_caption * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-captionText:after',
						"rule": {
							"content": `"${ Math.round(fat_caption * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-noteText',
						"rule": {
							"font-size": `${ (param.modules.note.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.note.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.note.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_note }px, transparent ${ fat_note }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_note }px, transparent ${ fat_note }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-noteText:before',
						"rule": {
							"content": `"${ Math.round(fat_note * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-noteText:after',
						"rule": {
							"content": `"${ Math.round(fat_note * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-noteText',
						"rule": {
							"font-size": `${ (param.modules.note.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.note.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.note.letterSpacing }px`,
							"background-image": `linear-gradient(to bottom, #ffe5e5 0%, #ffe5e5 ${ fat_note }px, transparent ${ fat_note }px, transparent 100%), linear-gradient(to top, #ffe5e5 0%, #ffe5e5 ${ fat_note }px, transparent ${ fat_note }px, transparent 100%)`
						}
					}, {
						"selector": '.mod-noteText:before',
						"rule": {
							"content": `"${ Math.round(fat_note * 10) / 10 }"`
						}
					}, {
						"selector": '.mod-noteText:after',
						"rule": {
							"content": `"${ Math.round(fat_note * 10) / 10 }"`
						}
					},{
						"selector": '.mod-button',
						"rule": {
							"font-size": `${ (param.modules.button.fontSize / 10) * magnification }rem`,
							"line-height": `${ param.modules.button.lineHeightRate / 100 }`,
							"letter-spacing": `${ param.modules.button.letterSpacing }px`
						}
					}
				];

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
