<template>
	<v-container grid-list-xl fluid>
		<v-layout column>
			<v-flex xs12>
				<v-toolbar class="table-toolbar" flat>
					<v-toolbar-title>Payment types</v-toolbar-title>
					<v-spacer />
					<v-btn round @click="addPaymentTypeForm"><v-icon class="primary--text">mdi-plus</v-icon> Add payment type</v-btn>
				</v-toolbar>
				<payment-type-form-dialog ref="paymentTypeForm"></payment-type-form-dialog>
				<v-data-table
					:headers="headers"
					:items="allPaymentTypes"
					:pagination.sync="pagination"
					:loading="isLoading"
					class="elevation-1"
				>
					<template slot="items" slot-scope="props">
						<tr :key="props.item._id" @click="editPaymentTypeForm(props.item)">
							<td class="text-xs-left">{{ formatDate(props.item._created) }}</td>
                            <td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-left">{{ props.item.key }}</td>
							<td class="text-xs-left">{{ props.item.suppliers }}</td>
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
import PaymentTypeFormDialog from './PaymentTypeFormDialog'
/* eslint-disable */
export default {
	name: 'PaymentTypes',
	data() {
		return {
			pagination: {
				sortBy: '_created',
                descending: true,
                page: 1,
				rowsPerPage: 10,
			},
			headers: [
                {
                    text: 'Created',
                    value: '_created',
                },
                {
                    text: 'Name',
					value: 'name',
				},
				{
                    text: 'Key',
					value: 'key',
				},
				{
					text: 'Number of suppliers',
					value: 'suppliers',
				},
			]
		}
	},
	computed: {
		...mapGetters('payment_type', ['allPaymentTypes', 'isLoading']),
	},
	methods: {
		...mapActions('payment_type', ['fetchPaymentTypes', 'addPaymentType', 'editPaymentType']),
		async addPaymentTypeForm() {
			await this.$refs.paymentTypeForm.open(this.addPaymentType)
		},
		async editPaymentTypeForm(paymentType) {
			await this.$refs.paymentTypeForm.open(this.editPaymentType, paymentType)
		},
		relocate(id) {
			this.$router.push(`/payment_types/${id}`)
		},
		formatDate(date) {
			return moment(date).format('YYYY-MM-DD HH:mm')
		}
	},
	created() {
		this.fetchPaymentTypes()
	},
	components: {
		PaymentTypeFormDialog,
	}
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
