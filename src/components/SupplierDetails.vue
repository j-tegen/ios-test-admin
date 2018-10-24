<template>
	<v-container fluid grid-list-lg>
    <v-layout wrap>
      <v-flex xs12>
				<supplier-form-card
					@save="editSupplier"
					:_supplier="activeSupplier"
					:isLoading="isLoading">
				</supplier-form-card>
			</v-flex>
			<v-flex xs12 md6>
				<payment-type-table :paymentTypes="supplierPaymentTypes" @connectNew="openConnectPaymentType"></payment-type-table>
				<connect-related-dialog
					ref="connectPaymentTypeDialog"
					:relatedRecords="allPaymentTypes"
					:title="'Connect payment type'"
					:objectId="activeSupplier._id"
					icon="mdi-credit-card"
				></connect-related-dialog>
			</v-flex>
			<v-flex xs12 md6>
				<reimbursement-type-table :reimbursementTypes="supplierReimbursementTypes" @connectNew="openConnectReimbursementType"></reimbursement-type-table>
				<connect-related-dialog
					ref="connectReimbursementTypeDialog"
					:relatedRecords="allReimbursementTypes"
					:title="'Connect reimbursement type'"
					:objectId="activeSupplier._id"
					icon="mdi-cash"
				></connect-related-dialog>
			</v-flex>
    </v-layout>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SupplierFormCard from './SupplierFormCard'
import PaymentTypeTable from './PaymentTypeTable'
import ReimbursementTypeTable from './ReimbursementTypeTable'
import ConnectRelatedDialog from './ConnectRelatedDialog'
/* eslint-disable */

export default {
	name: 'SupplierDetails',
	methods: {
		async openConnectPaymentType() {
			await this.$refs.connectPaymentTypeDialog.open(this.connectPayment)
		},
		async openConnectReimbursementType() {
			await this.$refs.connectReimbursementTypeDialog.open(this.connectReimbursement)
		},
		...mapActions('supplier', [
			'fetchSupplier',
			'editSupplier',
			'connectPaymentType',
			'connectReimbursementType'
		]),
		...mapActions('supplier/payment_type', ['fetchPaymentTypes']),
		...mapActions('supplier/reimbursement_type', ['fetchReimbursementTypes']),
		...mapActions('payment_type', {
			fetchAllPaymentTypes: 'fetchPaymentTypes'
		}),
		...mapActions('reimbursement_type', {
			fetchAllReimbursementTypes: 'fetchReimbursementTypes'
		}),
		connectPayment({ objectId, selectedId }) {
			this.connectPaymentType({
				supplierId: objectId,
				paymentTypeId: selectedId
			})
		},
		connectReimbursement({ objectId, selectedId }) {
			this.connectReimbursementType({
				supplierId: objectId,
				reimbursementTypeId: selectedId
			})
		}
	},
	computed: {
		...mapGetters('supplier', [
			'activeSupplier',
			'isLoading',
		]),
		...mapGetters('supplier/payment_type', {
			isLoadingPT: 'isLoading',
			supplierPaymentTypes: 'allPaymentTypes',
		}),
		...mapGetters('supplier/reimbursement_type', {
			isLoadingRT: 'isLoading',
			supplierReimbursementTypes: 'allReimbursementTypes',
		}),
		...mapGetters('payment_type', [
			'allPaymentTypes'
		]),
		...mapGetters('reimbursement_type', [
			'allReimbursementTypes'
		])
	},
	mounted() {
		const { id } = this.$router.history.current.params
		if (id) {
			this.fetchSupplier(id)
			this.fetchPaymentTypes(id)
			this.fetchReimbursementTypes(id)
			if ( !this.allPaymentTypes ){
				this.fetchAllPaymentTypes()
			}
			if ( !this.allReimbursementTypes ) {
				this.fetchAllReimbursementTypes()
			}
		}
	},
	components: {
		SupplierFormCard,
		PaymentTypeTable,
		ReimbursementTypeTable,
		ConnectRelatedDialog
	}
}
</script>

<style>

</style>
