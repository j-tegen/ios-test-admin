<template>
    <v-card color="primary white--text">
        <v-card-title>
            <span class="headline">Average delay</span></v-card-title>
        <v-card-text class="text-xs-center display-4">
            {{ `${average} min` }}
        </v-card-text>
    </v-card>
</template>

<script>
/* eslint-disable */
export default {
    name: 'AverageDelayCard',
    props: [
        'reclamations'
    ],
    computed: {
        average() {
            if (this.reclamations.length === 0) {
                return 0;
            }
            return this.reclamations.reduce((acc, val) => {
                return val.delay + acc;
            }, 0) / this.reclamations.length;
        }
    }
}
</script>

<style>

</style>
