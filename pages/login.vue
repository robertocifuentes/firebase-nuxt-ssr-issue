<template>
  <div class="login-container">
    <h3>Login</h3>
    <input v-model="email" type="text" placeholder="email" />
    <input v-model="password" type="password" placeholder="password" />
    <button @click.prevent="login()">Login</button>
    <nuxt-link to="/">Go to home</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      redirect: '/',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (newValue) this.$router.push(this.redirect)
    },
  },
  methods: {
    async login() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (err) {
        alert(err.code + ' ' + err.message)
      }
    },
  },
}
</script>

<style lang="css" scoped>
.login-container {
  display: grid;
  place-content: center;
  min-height: 100vh;
  grid-template-columns: 1fr;
  gap: 15px;
  max-width: 300px;
  margin: auto;
}
</style>
