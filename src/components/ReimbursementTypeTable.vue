<template>
    <div>
        <v-toolbar class="table-toolbar" color="white" flat>
            <v-toolbar-title class="primary--text">Reimbursement types</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" round @click="connectNew"><v-icon >mdi-link</v-icon> Connect new</v-btn>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="reimbursementTypes"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props" >
                <td>{{ props.item._descriptive }}</td>
                <td class="text-xs-left">{{ props.item.key }}</td>
                <td class="text-xs-left">{{ props.item._id }}</td>
				<td>
					<v-tooltip bottom class="justify-center layout px-0">
						<v-icon small
							slot="activator"
							class="mr-2"
							@click="disconnect(props.item._id)">mdi-link-off
						</v-icon>
						<span>Disconnect this reimbursement type</span>
					</v-tooltip>
				</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
	name: 'ReimbursementTypeTable',
	data() {
		return {
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
					text: '',
					value: 'disconnect',
					sortable: false,
				}
            ],
		}
	},
	methods: {
		connectNew() {
			this.$emit('connectNew')
		},
		disconnect(id) {
			this.$emit('disconnect', id)
		}
	},
	props: {
        reimbursementTypes: Array,
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
</style>
