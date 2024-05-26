export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, payload) {
    try {
      await this.$axios.$get('/sanctum/csrf-cookie');

      const response = await this.$axios.$get('/api/user');
      commit('setUser', response);
      return response;
    } catch (error) {
    }
  },

  async login({ commit }, payload) {
    try {
      const query = `
          mutation($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `

      const response = await this.$axios.post('/graphql',{
        query,
        variables: payload
      })

      const { data } = response.data;
      const login = JSON.parse(data.login)
      localStorage.setItem('token', login.token);

      commit('setUser', login.user);
      return login.user;
    } catch (e) {

    }
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  }
};
