import router from '@/router/index'

export const state = {
    currentUser: sessionStorage.getItem('authUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
        if (newValue == null) {
            localStorage.removeItem('user');
        } else {
            localStorage.setItem('user', JSON.stringify(newValue));
        }
    }
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    }
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { acode, scode } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        const user = {
            acode,
            scode
        }
        commit('SET_CURRENT_USER', user)
        router.push({ name: 'default' });
        return user;
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        return state.currentUser;
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.sessionStorage.setItem(key, JSON.stringify(state))
}
