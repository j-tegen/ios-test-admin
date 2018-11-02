<template>
	<v-container fluid grid-list-lg>
        <div v-if="isLoading" class="text-xs-center">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
		<v-layout v-else wrap>
			<v-flex xs12>
				<v-card>
                    <v-card-title>
                        <span class="headline">User</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm3>
                                    <v-text-field
                                        label="Name"
                                        v-model="activeUser.name"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field
                                        label="Email"
                                        v-model="activeUser.email"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field
                                        label="Phone"
                                        v-model="activeUser.phone_number"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field
                                        label="User since"
                                        v-model="registered"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
			</v-flex>
            <v-flex xs12>
                <supplier-user-info-list :supplier_user_infos="activeUser.supplier_user_infos" :isLoading="isLoading"></supplier-user-info-list>
            </v-flex>
            <v-flex>
				<reclamation-table :reclamations="activeUser.reclamations" :isLoading="isLoading"></reclamation-table>
			</v-flex>
            <v-flex xs12 lg12>
                <v-card>
                    <v-card-title>Battles</v-card-title>
                    <v-card-text>
                        <ReclamationChart v-if="!isLoading" :reclamations="activeUser.reclamations"></ReclamationChart>
                    </v-card-text>
                </v-card>
            </v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import ReclamationTable from'./ReclamationTable'
import ReclamationChart from './ReclamationChart'
import SupplierUserInfoList from './SupplierUserInfoList'

/* eslint-disable */

export default {
	name: 'UserDetails',
	methods: {
        ...mapActions('user', [
            'fetchUser',
        ])
	},
	computed: {
		...mapGetters('user', [
			'activeUser',
			'isLoading',
        ]),
        registered() {
            return this.isLoading ? '' : moment(this.activeUser.registered_on).format('YYYY-MM-DD HH:mm')
        }
	},
	mounted() {
		const { id } = this.$router.history.current.params
		if (id) {
			this.fetchUser(id)
		}
	},
	components: {
        ReclamationTable,
        SupplierUserInfoList,
        ReclamationChart
	}
}
</script>

<style scoped>
.full-height {
	height: 100%;
}
</style>
