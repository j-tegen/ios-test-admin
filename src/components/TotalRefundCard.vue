<template>
    <v-card class="gradient white--text">
        <v-card-title class="text-cs-center headline">
            Amount refunded
        </v-card-title>
        <v-card-text class="text-xs-center display-3">
            {{ `${totalRefund} kr` }}
        </v-card-text>
    </v-card>
</template>

<script>
/* eslint-disable */
export default {
    name: 'TotalRefundCard',
    props: [
        'reclamations'
    ],
    computed: {
        totalRefund() {
            if (this.reclamations.length === 0) {
                return 0;
            }
            return this.reclamations.reduce((acc, val) => {
                return parseInt(val.refund) + acc;
            }, 0);
        }
    }
}
</script>

<style>

</style>
