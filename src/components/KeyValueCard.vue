<template>
    <v-card class="gradient white--text">
        <v-card-title class="text-cs-center headline">
            {{ title }}
        </v-card-title>
        <v-card-text class="text-xs-center display-3">
            {{ unitValue }}
        </v-card-text>
    </v-card>
</template>

<script>
/* eslint-disable */
export default {
    name: 'AverageDelayCard',
    props: [
        'value',
        'title',
        'subtitle',
        'unit',
        'unitBefore'
    ],
    computed: {
        unitValue() {
            if (this.unitBefore) {
                return `${this.unit} ${this.value}`
            }
            return `${this.value} ${this.unit}`
        }
    }
}
</script>

<style>

</style>
