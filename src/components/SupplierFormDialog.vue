<template>
	<v-layout row justify-center>
		<v-dialog v-model="dialog" persistent max-width="500px">
			<v-card>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-card-title>
						<span class="headline">Supplier</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
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
						<v-btn flat round @click.native="dialog = false">Cancel</v-btn>
						<v-btn color="primary" round @click.native="save">Save</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
export default {
	name: 'SupplierFormDialog',
	data() {
		return {
			dialog: false,
			supplier: {
				name: '',
				key: '',
				_id: null,
			},
			stringRules: [
				v => !!v
			],
			valid: true,
			saveCallback: null,
		}
	},
	methods: {
		open(callback, _supplier) {
			this.saveCallback = callback
			this.dialog = true
			if (_supplier) {
				this.supplier = _supplier
			} else {
				this.supplier = {
					name: '',
					key: '',
					_id: null,
				}
			}

			return new Promise((resolve, reject) => {
				this.resolve = resolve
				this.reject = reject
			})
		},
		async save() {
			if(this.$refs.form.validate()) {
				await this.saveCallback(this.supplier)
				this.resolve(true)
				this.dialog = false
			}
		},
		cancel() {
			this.resolve(false)
			this.dialog = false
		},
	},
}
</script>

<style>

</style>
