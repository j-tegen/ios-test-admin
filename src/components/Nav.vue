<template>
	<v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      mobile-break-point="0"
      fixed
      app
    >
		<v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Reseersättaren
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

		<v-divider></v-divider>

		<v-list dense>
			<v-list-tile :to="'/'">
        <v-list-tile-action>
          <v-icon>mdi-speedometer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile :to="'/suppliers'">
        <v-list-tile-action>
          <v-icon>mdi-train-car</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Suppliers</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="'/users'">
        <v-list-tile-action>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="'/reclamations'">
        <v-list-tile-action>
          <v-icon>mdi-sword-cross</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Battles</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile :to="'/payment_types'">
        <v-list-tile-action>
          <v-icon>mdi-credit-card-settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Payment types</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="'/reimbursement_types'">
        <v-list-tile-action>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Reimbursement types</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Nav',
	methods: {
		onClick() {

		}
	}
}
</script>

<style>

</style>
