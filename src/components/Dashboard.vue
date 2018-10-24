<template>
	<v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-flex xs12 lg6>
        <v-card>
          <v-card-title>Registered users</v-card-title>
          <v-card-text>
            <RegistrationChart v-if="!isLoadingUser && !hasErrorUser" :users="allUsers"></RegistrationChart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex cs12 lg6>
        <v-card>
          <v-card-title>New battles</v-card-title>
          <v-card-text>
            <ReclamationChart v-if="!isLoadingReclamation && !hasErrorReclamation" :reclamations="allReclamations"></ReclamationChart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RegistrationChart from './RegistrationChart'
import ReclamationChart from './ReclamationChart'

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions('user', [
      'fetchUsers',
    ]),
    ...mapActions('reclamation', [
      'fetchReclamations',
    ])
  },
  computed: {
    ...mapGetters('user', {
      isLoadingUser: 'isLoading',
      allUsers: 'allUsers',
      hasErrorUser: 'hasError',
    }),
    ...mapGetters('reclamation', {
      isLoadingReclamation: 'isLoading',
      allReclamations: 'allReclamations',
      hasErrorReclamation: 'hasError',
    }),
  },
  created() {
    this.fetchUsers()
    this.fetchReclamations()
    // this.fetchUser(1)
  },
  components: {
    RegistrationChart,
    ReclamationChart,
  }
}
</script>

<style>

</style>
