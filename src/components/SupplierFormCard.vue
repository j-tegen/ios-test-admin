<template>
	<v-card>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-card-title>
				<span class="headline">Supplier</span>
			</v-card-title>
			<v-card-text>
				<v-container grid-list-md>
					<v-layout v-if="isLoading" justify-center>
						<v-progress-circular
							:size="50"
							color="primary"
							indeterminate
						></v-progress-circular>
					</v-layout>
					<v-layout v-else wrap>
						<v-flex xs12 sm6>
							<v-text-field
								label="Name"
								v-model="supplier.name"
								:rules="stringRules"
								required>
							</v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-text-field
								label="key"
								v-model="supplier.key"
								hint="This must be unique"
								:rules="stringRules"
								required>
							</v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn v-if="showCancel" flat round @click.native="cancel">Cancel</v-btn>
				<v-btn color="primary" round @click.native="save">Save</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
/* eslint-disable */
export default {
	name: 'SupplierFormCard',
	props: [
		'_supplier',
		'isLoading',
		'showCancel',
	],
	data() {
		return {
			supplier: this._supplier,
			stringRules: [
				v => !!v
			],
			valid: true,
		}
	},
	watch: {
		'_supplier'() {
			this.supplier = this._supplier
		}
	},
	methods: {
		async save() {
			if(this.$refs.form.validate()) {
				this.$emit('save', this.supplier)
			}
		},
		cancel() {
			this.$emit('cancel')
		}
	},
}
</script>

<style scoped>
.v-card__actions {
	padding: 1em;
}
.v-card__text {
	padding: 0;
}
</style>
