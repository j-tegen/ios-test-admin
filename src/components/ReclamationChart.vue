

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
		reclamations: Array,
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
		newReclamations() {
			return this.dates.map(d => (
				this.reclamations.reduce((acc, reclamation) => this.isSameDay(moment(reclamation._created), d) ? acc + 1 : acc, 0)
			))
		},
		wonReclamations() {
			return this.dates.map(d => (
				this.reclamations.filter(r => r.approved).reduce((acc, reclamation) => (
					this.reclamations.reduce((acc, reclamation) => this.isSameDay(moment(reclamation._created), d) ? acc + 1 : acc, 0)
				), 0)
			))
		},
		chartData() {
			return {
				labels: this.dates.map(d => d.format('')),
				datasets: [
					{
						label: 'Added battles',
						backgroundColor: 'rgba(186, 104, 200, 0.7)',
						pointBorderColor: '#fff',
						pointBackgroundColor: '#fff',
						pointRadius: 3,
						lineColor: '#7B1FA2',
						data: this.newReclamations,
					},
					{
						label: 'Won battles',
						backgroundColor: 'rgba(38, 166, 154, 0.6)',
						pointBorderColor: '#fff',
						pointBackgroundColor: '#fff',
						pointRadius: 3,
						lineColor: '#00A79D',
						data: this.wonReclamations,
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
