export const state = () => ({
  user: {},
})
export const getters = {
  user(state) {
    return state.user
  },
  userDisplayName(state) {
    return state.user.displayName ? state.user.displayName : state.user.email
  },
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  isLoggedIn: (state) => {
    return !!state.user && !!state.user.uid
  },
}
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    if (!authUser) {
      state.user = {}
    } else {
      state.user = {
        uid: authUser.uid,
        displayName: authUser.displayName,
        email: authUser.email,
        emailVerified: authUser.emailVerified,
        photoURL: authUser.photoURL || null,
        metadata: authUser.metadata || null,
        claims,
      }
    }
  },
  SET: (state, { modulo, variable, valor }) => {
    if (modulo) {
      state[modulo][variable] = { ...state[modulo][variable], ...valor }
    } else {
      state[variable] = { ...state[variable], ...valor }
    }
  },
}

export const actions = {
  nuxtServerInit({ commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
    }
  },
  set({ commit }, { modulo, variable, valor }) {
    commit('SET', { modulo, variable, valor })
  },
}
