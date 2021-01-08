<template>
  <div class="container">
    <div class="title">You are loggedin!</div>
    <div>
      <button @click="logout()">logout</button>
      <button @click="makeRequest()">make a request</button>
    </div>
    <pre>RESPONSE: {{ response }}</pre>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      response: {},
    }
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.$router.go(0)
      } catch (error) {
        alert(`Unable to logout: ${error.message}`)
      }
    },
    async makeRequest() {
      const response = await this.$axios(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
      this.response = response
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 30px;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
