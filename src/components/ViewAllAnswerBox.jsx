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

	const getDisplay = () => {
		if (displayStyle == 'MC') {
			return (
				<div className={styles['graph-container']}>
					<Bar data={chartData} redraw={true} options={chartOptions} />
				</div>
			)
		} else {
			return (
				<div className={styles['log-container']}>
					{answers.map((answer) => (
						<div className={styles['answer-container']}>
							<div className={styles['answer']}>{answer.response}</div>
						</div>
					))}
				</div>
			)
		}
	}

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
	}, [answers])

	return (
		<div className={styles['wrapper']}>
			<div className={styles['toggle-container']}>
				<div
					onClick={() => setDisplayStyle('FR')}
					className={[
						styles['toggle-options'],
						styles['left-toggle'],
						displayStyle == 'FR' ? styles['selected'] : undefined,
					].join(' ')}>
					Log
				</div>
				<div
					onClick={() => setDisplayStyle('MC')}
					className={[
						styles['toggle-options'],
						styles['right-toggle'],
						displayStyle == 'MC' ? styles['selected'] : undefined,
					].join(' ')}>
					Graph
				</div>
			</div>
			<div className={styles['display']}>{getDisplay()}</div>
		</div>
	)
}
