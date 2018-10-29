

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'

import moment from 'moment'

export default {
	extends: Line,
	data() {
		return {
			options: {
				defaultFontColor: '#FFF',
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							unit: 'day',
							stepSize: 5
						}
					}]
				},
				legend: {
					fontColor: '#fff',
					labels: {
						fontColor: '#fff',
					}

				},
				responsive: true,
				maintainAspectRatio: false,
			}
		}
	},
	props: {
		users: Array,
	},
	methods: {
		getDates(nbrOfDays) {
			return [...Array(nbrOfDays).keys()].map((nbr) => {
				return moment().startOf('day').add(-1 * nbr, 'days')
			}).reverse()
		},
		isSameDay(d1, d2) {
			return d1.format('YYYY-MM-DD') === d2.format('YYYY-MM-DD')
		}
	},
	computed: {
		dates() {
			return this.getDates(30)
		},
		values() {
			return this.dates.map(d => (
				this.users.reduce((acc, user) => this.isSameDay(moment(user.registered_on), d) ? acc + 1 : acc, 0)
			))
		},
		chartData() {
			return {
				labels: this.dates.map(d => d.format('')),
				datasets: [
					{
					label: 'Registered users',
					backgroundColor: 'rgba(128, 222, 234, 0.7)',
					pointBorderColor: '#fff',
					pointBackgroundColor: '#fff',
					pointRadius: 3,
					lineColor: '#80DEEA',
					data: this.values,
					}
				]
			}
		}
	},
	mounted () {
		this.renderChart(this.chartData, this.options)
	},

}
</script>

<style>

</style>
