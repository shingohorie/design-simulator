import createPersistedState from 'vuex-persistedstate'
 
export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: 'rj-ds-params'
		})(store)
	})
}