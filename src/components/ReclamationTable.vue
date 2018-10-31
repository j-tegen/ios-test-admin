<template>
    <div>
        <v-toolbar class="table-toolbar" flat>
            <v-toolbar-title>Battles</v-toolbar-title>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="reclamations"
            :pagination.sync="pagination"
            :loading="isLoading"
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <tr :key="props.item._id" @click="relocate(props.item._id)">
                    <td class="text-xs-left">{{ formatDate(props.item._created) }}</td>
                    <td class="text-xs-left">{{ props.item.supplier ? props.item.supplier._descriptive : null }}</td>
                    <td class="text-xs-left">{{ props.item.user ? props.item.user._descriptive : null }}</td>
                    <td class="text-xs-left">{{ `${props.item.delay} min` }}
                    <td class="text-xs-left">
                        <v-icon v-if="props.item.approved" small color="green">mdi-thumb-up</v-icon>
                        <v-icon v-else small color="red">mdi-thumb-down</v-icon>
                    </td>
                    <td class="text-xs-left">{{ `${props.item.refund} kr` }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'ReclamationTable',
    data() {
		return {
			pagination: {
				sortBy: '_created',
				descending: true,
				rowsPerPage: 10,
				totalItems: 0,
			},
			headers: [
				{
					text: 'Created',
					value: '_created',
				},
				{
					text: 'Supplier',
					value: 'supplier',
				},
				{
					text: 'User',
					value: 'user',
                },
                {
                    text: 'Delay',
                    value: 'delay',
                },
				{
					text: 'Approved',
					value: 'approved',
				},
				{
					text: 'Refunded amount',
					value: 'refund',
				},
			]
		}
    },
    methods: {
        relocate(id) {
			this.$router.push(`/reclamations/${id}`)
		},
		formatDate(date) {
			return moment(date).format('YYYY-MM-DD HH:mm')
        },
    },
    props: [
        'reclamations',
        'isLoading',
    ]
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
