<template>
    <div>
        <v-toolbar>
            <v-toolbar-title >Supplier specific info</v-toolbar-title>
        </v-toolbar>
        <v-card v-if="supplier_user_infos.length === 0">
            <v-card-text class="text-xs-center">
                No data
            </v-card-text>
        </v-card>
        <v-expansion-panel v-else>
            <v-expansion-panel-content v-if="skanetrafiken">
                <div slot="header">{{skanetrafiken.supplier._descriptive}}</div>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm4>
                                    <v-text-field
                                        label="Jojo card number"
                                        v-model="skanetrafiken.jojo_number"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <v-text-field
                                        label="Default payment type"
                                        v-model="skanetrafiken.payment_type._descriptive"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <v-text-field
                                        label="Default reimbursement type"
                                        v-model="skanetrafiken.reimbursement_type._descriptive"
                                        disabled>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'SupplierUserInfoList',
    props: [
        'supplier_user_infos',
        'isLoading',
    ],
    computed: {
        skanetrafiken() {
            const skanetrafiken = this.supplier_user_infos.filter(s => s.supplier._key === 'skanetrafiken')[0]
            return skanetrafiken
        }
    }
}
</script>

<style scoped>

</style>
