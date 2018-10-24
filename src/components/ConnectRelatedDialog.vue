<template>
	<v-layout row justify-center>
		<v-dialog v-model="dialog" persistent max-width="500px">
			<v-card>

				<v-card-title>
					<span class="headline">{{title}}</span>
				</v-card-title>
				<v-card-text>
					<v-list>
						<v-radio-group :mandatory="true">
							<template v-for="record in relatedRecords">
								<v-list-tile :key="record._id" @click="select(record._id)">
									<v-list-tile-avatar>
										<v-icon>{{icon}}</v-icon>
									</v-list-tile-avatar>
									<v-list-tile-content>
										<v-list-tile-title>{{ record._descriptive }}</v-list-tile-title>
									</v-list-tile-content>
									<v-list-tile-action>
										<v-checkbox v-model="selectedId" :value="record._id"></v-checkbox>
									</v-list-tile-action>
								</v-list-tile>
							</template>
						</v-radio-group>
					</v-list>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn flat round @click.native="dialog = false">Cancel</v-btn>
					<v-btn color="primary" round @click.native="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
/* eslint-disable */
export default {
	name: 'ConnectRelatedDialog',
	data() {
		return {
			dialog: false,
			callback: null,
			selectedId: null,
		}
	},
	props: ['objectId', 'relatedRecords', 'title', 'subtitle', 'icon'],
	methods: {
		open(_callback) {
			this.dialog = true
			this.callback = _callback
			return new Promise((resolve, reject) => {
				this.resolve = resolve
				this.reject = reject
			})
		},
		select(id) {
			this.selectedId = (id === this.selectedId ? null : id)
		},
		async save() {
			const params = {
				objectId: this.objectId,
				selectedId: this.selectedId,
			}
			this.callback(params)
			this.resolve(true)
			this.dialog = false
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
