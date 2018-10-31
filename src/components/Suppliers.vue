<template>
	<v-container grid-list-xl fluid>
		<v-layout column>
			<v-flex xs12>
				<v-toolbar class="table-toolbar" flat>
					<v-toolbar-title >Suppliers</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn round @click="addSupplierForm"><v-icon class="primary--text">mdi-plus</v-icon> Add supplier</v-btn>
				</v-toolbar>
				<SupplierFormDialog ref="supplierForm"></SupplierFormDialog>
				<v-data-table
					:headers="headers"
					:items="allSuppliers"
					:loading="isLoading"
					:pagination.sync="pagination"
					class="elevation-1"
				>
					<template slot="items" slot-scope="props">
						<tr :key="props.item._id" @click="relocate(props.item._id)">
							<td>{{ props.item._descriptive }}</td>
							<td class="text-xs-left">{{ props.item.key }}</td>
							<td class="text-xs-left">{{ props.item._id }}</td>
							<td class="text-xs-left">{{ props.item.reclamations }}</td>
							<td class="text-xs-left">{{ props.item.payment_types }}</td>
							<td class="text-xs-left">{{ props.item.reimbursement_types }}</td>
						</tr>
					</template>
				</v-data-table>

			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SupplierFormDialog from './SupplierFormDialog'

/* eslint-disable */
export default {
	name: 'Suppliers',
	data() {
		return {
			pagination: {
				sortBy: '_descriptive',
				descending: false,
				rowsPerPage: 10,
			},
			headers: [
				{
					text: 'Name',
					value: '_descriptive',
				},
				{
					text: 'Key',
					value: 'key',
				},
				{
					text: 'ID',
					value: '_id',
				},
				{
					text: 'Battles',
					value: 'reclamations',
				},
				{
					text: 'Payment types',
					value: 'payment_types',
				},
				{
					text: 'Reimbursement types',
					value: 'reimbursement_types',
				}
			]
		}
	},
	computed: {
		...mapGetters('supplier', ['allSuppliers', 'isLoading']),
	},
	methods: {
		...mapActions('supplier', ['fetchSuppliers', 'addSupplier', 'editSupplier']),
		async addSupplierForm() {
			await this.$refs.supplierForm.open(this.addSupplier)
		},
		async editSupplierForm(supplier) {
			await this.$refs.supplierForm.open(this.editSupplier, supplier)
		},
		relocate(id) {
			this.$router.push(`/suppliers/${id}`)
		}
	},
	created() {
		this.fetchSuppliers()
	},
	components: {
		SupplierFormDialog,
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
