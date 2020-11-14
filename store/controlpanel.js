export const state = () => ({
	isShown: false,
	currentTab: 'grid',
});

export const mutations = {
	show (state) {
		state.isShown = true;
	},
	close (state) {
		state.isShown = false;
	},
	switchTab (state, name) {
		state.currentTab = name;
	}
}

export const actions = {
};

export const getters = {
	isShown: function (state){
		return state.isShown;
	},
	currentTab: function(state) {
		return state.currentTab;
	}
};
