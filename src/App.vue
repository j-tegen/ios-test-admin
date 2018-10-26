<template>
  <v-app id="app" dark>
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
html {
  background: #0f242f;
}

.theme--dark{
  &.application {
    background-color: #0f242f;
  }
  .theme--dark.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background-color: #2a414c;
  }
  &.v-toolbar,
  &.v-list,
  &.v-btn {
    background-color: #1f313c !important;
  }
  .v-table,
  .v-navigation-drawer,
  .v-card {
    background-color: #1f313c;
  }
  &.v-datatable .v-datatable__actions {
    background-color: #1f313c;
  }
}


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

.table-toolbar {
  background-color: #fff;
}

.gradient--text {
	background: linear-gradient(to right, #30CFD0 0%, #330867 150%);
  color:transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.gradient {
	background: linear-gradient(to bottom right, #30CFD0 0%, #330867 150%);
  color: #fff;
}
</style>
