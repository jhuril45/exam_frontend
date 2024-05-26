<!-- pages/register.vue -->
<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required />
      <input
        v-model="password_confirmation"
        type="password"
        placeholder="Confirm Password"
        required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        this.$router.push('/login')
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>
