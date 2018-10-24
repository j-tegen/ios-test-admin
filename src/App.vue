<template>
  <v-app id="app">
    <Nav />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Nav from './components/Nav'

export default {
  name: 'app',
  components: {
    Nav
  },
  methods: {
    ...mapActions('user', [
      'fetchUser',
    ])
  },
  computed: {
    ...mapGetters('auth', [
      'userId'
    ])
  },
}
</script>

<style lang="scss">
.v-card__title.spaced {
  padding: 6em 2em 3em 3em;
}

.v-card__actions {
  padding: 1em;
}

.v-btn__content {
  .v-icon {
    margin-right: 0.5em;
  }
}

th {
  .v-icon {
    margin-left: 0.2em;
  }
}
</style>
