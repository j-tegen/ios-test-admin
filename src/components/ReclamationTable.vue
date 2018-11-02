<template>
    <div>
        <v-toolbar class="table-toolbar" flat>
            <v-toolbar-title>Battles</v-toolbar-title>
        </v-toolbar>
        <v-data-table
            :headers="computedHeaders"
            :items="reclamations"
            :pagination.sync="pagination"
            :loading="isLoading"
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <tr :key="props.item._id" @click="relocate(`/reclamations/${props.item._id}`)">
                    <td class="text-xs-left">
                        {{ formatDate(props.item._created) }}
                    </td>
                    <td class="text-xs-left">
                        <a v-if="props.item.supplier" @click.stop="relocate(`/suppliers/${props.item.supplier._id}`)">
                            {{props.item.supplier._descriptive}}
                        </a>
                    </td>
                    <td class="text-xs-left">
                        <a v-if="props.item.user" @click.stop="relocate(`/users/${props.item.user._id}`)">
                            {{props.item.user._descriptive}}
                        </a>
                    </td>
                    <td class="text-xs-left">{{ `${props.item.delay} min` }}</td>
                    <td class="text-xs-center">
                        <v-icon v-if="props.item.approved" small color="green">mdi-thumb-up</v-icon>
                        <v-icon v-else small color="red">mdi-thumb-down</v-icon>
                    </td>
                    <td class="text-xs-right">{{ `${props.item.refund} kr` }}</td>
                    <td class="text-xs-left">{{ props.item.from_station }}</td>
                    <td class="text-xs-left">{{ props.item.to_station }}</td>
                    <td class="text-xs-left">{{ props.item.payment_type }}</td>
                    <td class="text-xs-left">{{ props.item.reimbursement_type }}</td>
                </tr>
            </template>
            <tr>
                <template v-for="header in computedHeaders">
                    <td :key="header.value">Test</td>
                </template>
            </tr>
        </v-data-table>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'ReclamationTable',
    computed: {
        computedHeaders () {
            return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])
        }
    },
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
                {
                    text: 'From station',
                    value: 'from_station',
                },
                {
                    text: 'To station',
                    value: 'to_station',
                },
                {
                    text: 'Payment type',
                    value: 'payment_type',
                },
                {
                    text: 'Reimbursement type',
                    value: 'reimbursement_type',
                },
			]
		}
    },
    methods: {
        relocate(url) {
			this.$router.push(url)
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

table.v-table tbody td, table.v-table tbody th {
    white-space: nowrap;
}
</style>
