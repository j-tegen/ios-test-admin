<template>
	<v-container grid-list-xl fluid>
		<v-layout column>
			<v-flex xs12>
				<v-toolbar class="table-toolbar" flat>
					<v-toolbar-title>Reimbursement types</v-toolbar-title>
					<v-spacer />
					<v-btn round @click="addReimbursementTypeForm"><v-icon class="primary--text">mdi-plus</v-icon> Add reimbursement type</v-btn>
				</v-toolbar>
				<reimbursement-type-form-dialog ref="reimbursementTypeForm"></reimbursement-type-form-dialog>
				<v-data-table
					:headers="headers"
					:items="allReimbursementTypes"
					:pagination.sync="pagination"
					:loading="isLoading"
					class="elevation-1"
				>
					<template slot="items" slot-scope="props">
						<tr :key="props.item._id" @click="editReimbursementTypeForm(props.item)">
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
import ReimbursementTypeFormDialog from './ReimbursementTypeFormDialog'
/* eslint-disable */
export default {
	name: 'ReimbursementTypes',
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
		...mapGetters('reimbursement_type', ['allReimbursementTypes', 'isLoading']),
	},
	methods: {
		...mapActions('reimbursement_type', ['fetchReimbursementTypes', 'addReimbursementType', 'editReimbursementType']),
		async addReimbursementTypeForm() {
			await this.$refs.reimbursementTypeForm.open(this.addReimbursementType)
		},
		async editReimbursementTypeForm(reimbursementType) {
			await this.$refs.reimbursementTypeForm.open(this.editReimbursementType, reimbursementType)
		},
		relocate(id) {
			this.$router.push(`/reimbursement_types/${id}`)
		},
		formatDate(date) {
			return moment(date).format('YYYY-MM-DD HH:mm')
		}
	},
	created() {
		this.fetchReimbursementTypes()
	},
	components: {
		ReimbursementTypeFormDialog,
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
