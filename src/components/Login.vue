<template>
	<v-container fluid>
    <v-layout column>
      <v-flex xs12>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Password"
						required
					></v-text-field>

					<v-btn
						round
						color="primary"
						:disabled="!valid"
						@click="submit"
					>
						login
					</v-btn>
					<v-btn @click="clear">clear</v-btn>
				</v-form>
			</v-flex>
    </v-layout>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'Login',
	methods: {
		submit() {
			if(this.$refs.form.validate()) {
				this.login({email: this.email, password: this.password})
			}
		},
		clear () {
			this.$refs.form.reset()
		},
		...mapActions('auth', [
			'login',
		])
	},
	data() {
		return {
			valid: true,
			email: '',
			password: '',
			emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
			]
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
