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
				<key-value-card
					class="full-height"
					:value="averageDelay"
					title="Average delay" unit="min"/>
			</v-flex>
			<v-flex xs6 md3>
				<key-value-card
					class="full-height"
					:value="totalRefund"
					title="Refunded money"
					unit="kr" />
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
			<v-flex xs12 md12>
				<v-card class="full-height">
					<v-card-title>Battles</v-card-title>
					<v-card-text>
						<reclamation-chart v-if="!isLoadingReclamations" :isLoading="isLoadingReclamations" :reclamations="supplierReclamations"></reclamation-chart>
					</v-card-text>
				</v-card>
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
import KeyValueCard from './KeyValueCard'
import ReclamationChart from './ReclamationChart'
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
		]),
		averageDelay() {
            if (this.supplierReclamations.length === 0) {
                return 0;
            }
            return this.supplierReclamations.reduce((acc, val) => {
                return val.delay + acc;
            }, 0) / this.supplierReclamations.length;
		},
		totalRefund() {
            if (this.supplierReclamations.length === 0) {
                return 0;
            }
            return this.supplierReclamations.reduce((acc, val) => {
                return parseInt(val.refund) + acc;
            }, 0);
        }
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
		KeyValueCard,
		ReclamationChart,
	}
}
</script>

<style scoped>
.full-height {
	height: 100%;
}
</style>
