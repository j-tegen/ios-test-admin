<template>
	<v-container fluid grid-list-lg>
		<v-layout wrap>
			<v-flex xs12 md6>
				<supplier-form-card
					class="full-height"
					@save="editSupplier"
					:_supplier="activeSupplier"
					:isLoading="isLoading">
				</supplier-form-card>
			</v-flex>
			<v-flex xs6 md3>
				<average-delay-card class="full-height" :reclamations="supplierReclamations"></average-delay-card>
			</v-flex>
			<v-flex xs6 md3>
				<total-refund-card class="full-height" :reclamations="supplierReclamations"></total-refund-card>
			</v-flex>
			<v-flex xs12>
				<reclamation-table class="full-height" :reclamations="supplierReclamations" :isLoading="isLoadingReclamations"></reclamation-table>
			</v-flex>
			<v-flex xs12 md6>
				<payment-type-table class="full-height" :paymentTypes="supplierPaymentTypes" @connectNew="openConnectPaymentType"></payment-type-table>
				<connect-related-dialog
					class="full-height"
					ref="connectPaymentTypeDialog"
					:relatedRecords="allPaymentTypes"
					:title="'Connect payment type'"
					:objectId="activeSupplier._id"
					icon="mdi-credit-card"
				></connect-related-dialog>
			</v-flex>
			<v-flex xs12 md6>
				<reimbursement-type-table class="full-height" :reimbursementTypes="supplierReimbursementTypes" @connectNew="openConnectReimbursementType"></reimbursement-type-table>
				<connect-related-dialog
					class="full-height"
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
import ReclamationTable from './ReclamationTable'
import AverageDelayCard from './AverageDelayCard'
import TotalRefundCard from './TotalRefundCard'
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
		...mapActions('supplier/reclamation', ['fetchReclamations']),
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
		...mapGetters('supplier/reclamation', {
			isLoadingReclamations: 'isLoading',
			supplierReclamations: 'allReclamations',
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
			this.fetchReclamations(id)
			this.fetchAllPaymentTypes()
			this.fetchAllReimbursementTypes()

		}
	},
	components: {
		SupplierFormCard,
		PaymentTypeTable,
		ReimbursementTypeTable,
		ConnectRelatedDialog,
		ReclamationTable,
		AverageDelayCard,
		TotalRefundCard,
	}
}
</script>

<style scoped>
.full-height {
	height: 100%;
}
</style>
