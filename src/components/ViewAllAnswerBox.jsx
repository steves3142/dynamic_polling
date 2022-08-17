import styles from '../styles/components/ViewAllAnswerBox.module.css'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import gradient from 'chartjs-plugin-gradient'

Chart.register(gradient)

export default function ViewAllAnswerBox({ socket, answers, currentQuestion }) {
	const [displayStyle, setDisplayStyle] = useState(
		currentQuestion ? currentQuestion.question.type : 'FR'
	)
	const [chartData, setchartData] = useState({
		labels: [],
		plugins: { gradient },
		datasets: [
			{
				label: 'choices',
				data: [],
				gradient: {
					backgroundColor: {
						axis: 'y',
						colors: {
							0: '#22c1c3',
						},
					},
				},
			},
		],
	})
	const [chartOptions, setChartOptions] = useState({
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: `# Clients`,
				},
			},
		},
		// animation: false,
	})

	useEffect(() => {
		let responses = answers.map((answer) => answer.response)
		let unique = new Set(responses)
		let responsePair = {}
		for (const response of responses) {
			if (responsePair[response]) {
				responsePair[response]++
			} else {
				responsePair[response] = 1
			}
		}
		let chartDataCopy = { ...chartData }
		chartDataCopy.labels = Array.from(unique).sort()
		let data = Object.keys(responsePair).map((key) => responsePair[key])
		chartDataCopy.datasets[0].data = data
		let greatest = [...data].sort()[data.length - 1]
		chartDataCopy.datasets[0].gradient.backgroundColor.colors = {}
		chartDataCopy.datasets[0].gradient.backgroundColor.colors['0'] = '#22c1c3'
		chartDataCopy.datasets[0].gradient.backgroundColor.colors[`${greatest}`] =
			'#18a6b9'
		setchartData(chartDataCopy)
		console.log(displayStyle)
	}, [answers])

	return (
		<div className={styles['wrapper']}>
			<div>
				{answers.length > 0 ? (
					<Bar data={chartData} redraw={true} options={chartOptions} />
				) : (
					''
				)}
			</div>
		</div>
	)
}
