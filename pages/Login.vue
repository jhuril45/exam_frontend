<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="pa-4 mt-4">
        <form class="login-form" @submit.prevent="loaded ? loginUser() : ''">
          <div>
            <label for="email">Email</label>
            <input id="email" v-model="email"  type="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password"  required />
          </div>
            <button type="submit" class="login-btn">Login</button>
          <p v-if="error" class="error-message mt-2">{{ error }}</p>
        </form>

      </v-card>
    </v-col>
  </v-row>

</template>

<script>
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
        title: 'test',
        description: 'test',
        status: 'todo',
        loaded: false,
      }
    },
    methods: {
      ...mapActions(['nuxtServerInit', 'login']),
      async checkUser() {
        try {
          const response = await this.nuxtServerInit();
          // console.log('checkUser user', response)
          if (response) {
            this.$router.push('/')
          }
          this.loaded = true
        } catch (error) {
          this.loaded = true
          // console.log('checkUser error', error)
        } finally {
          this.loaded = true
        }
      },

      async loginUser() {
        try {
          if (!this.loaded) return
          const response = await this.login({email: this.email, password: this.password});
          console.log('loginUser user', response)
          if (response.user) {
            this.$router.push('/')
          }
          if (response.error) this.error = response.error
        } catch (error) {
          // console.log('loginUser error', error)
        }
      }
    },
    mounted() {
      this.checkUser()
    }
  }

</script>


<style lang="scss">
.error-message {
  color: red;
}
.login-form {
  width: 100%;

  input {
    margin-bottom: 15px;
    color: white;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    border: solid white;

  }
}

.login-btn {
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: green;
  color: white;
  width: 100%;
}
</style>
