<template>
  <div>
    <router-view></router-view>
    <div id="app"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        section: 'Head',
        version: '0.10.0',
        callingAPI: false,
        serverURI: 'https://api.online-bani.ru',
        caller: this.$http
      }
    },
    methods: {
      callAPI: function (method, url, body) {
        this.callingAPI = true
        url = this.serverURI + url
        return this.caller({
          url: url,
          method: method,
          body: body
        })
      },
      logout: function () {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.push('/login')
      }
    }
  }
</script>
