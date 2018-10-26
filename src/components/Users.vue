<template>
	<v-container grid-list-xl fluid>
		<v-layout column>
			<v-flex xs12>
				<v-toolbar class="table-toolbar" flat>
					<v-toolbar-title>Users</v-toolbar-title>
				</v-toolbar>
				<v-data-table
					:headers="headers"
					:items="allUsers"
					:pagination.sync="pagination"
					:loading="isLoading"
					class="elevation-1"
				>
					<template slot="items" slot-scope="props">
						<tr :key="props.item._id" @click="relocate(props.item._id)">
							<td class="text-xs-left">{{ formatDate(props.item.registered_on) }}</td>
                            <td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-left">{{ props.item.email }}</td>
							<td class="text-xs-left">{{ props.item.phone_number }}</td>
						</tr>
					</template>
				</v-data-table>

			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
/* eslint-disable */
export default {
	name: 'Users',
	data() {
		return {
			pagination: {
				sortBy: 'registered_on',
                descending: true,
                page: 1,
				rowsPerPage: 10,
				totalItems: 0,
			},
			headers: [
                {
                    text: 'Registered',
                    value: 'registered_on',
                },
                {
                    text: 'Name',
					value: 'name',
				},
				{
                    text: 'Email',
					value: 'email',
				},
				{
					text: 'Phone',
					value: 'phone_number',
				},
			]
		}
	},
	computed: {
		...mapGetters('user', ['allUsers', 'isLoading']),
	},
	methods: {
		...mapActions('user', ['fetchUsers']),
		relocate(id) {
			this.$router.push(`/users/${id}`)
		},
		formatDate(date) {
			return moment(date).format('YYYY-MM-DD HH:mm')
		}
	},
	created() {
		this.fetchUsers()
	},
}
</script>

<style scoped>
.table-toolbar {
	box-shadow: 0 0px 1px -1px rgba(0,0,0,.2),0 0px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12) !important;
}

td.actions > * {
	margin-left: 0.5em;
}

.toolbar-action {
	position: absolute;
	right: 0.5em;
	top: 0.5em;
}

tbody > tr {
	cursor: pointer;
}
</style>
