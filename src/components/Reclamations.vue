<template>
	<v-container grid-list-xl fluid>
		<v-layout column>
			<v-flex xs12>
				<reclamation-table :isLoading="isLoading" :reclamations="allReclamations"></reclamation-table>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ReclamationTable from './ReclamationTable'
/* eslint-disable */
export default {
	name: 'Reclamations',
	computed: {
		...mapGetters('reclamation', ['allReclamations', 'isLoading']),
	},
	methods: {
		...mapActions('reclamation', ['fetchReclamations']),
	},
	created() {
		this.fetchReclamations()
	},
	components: {
		ReclamationTable
	}
}
</script>

<style scoped>

</style>
