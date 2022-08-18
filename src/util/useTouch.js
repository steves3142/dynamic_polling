import { useState, useEffect } from 'react'

const useTouch = (ref) => {
	const [touchStart, setTouchStart] = useState({ x: null, y: null })
	const [touchEnd, setTouchEnd] = useState({ x: null, y: null })
	const [touched, setTouched] = useState(false)
	const [xDelta, setXDelta] = useState(0)
	const [yDelta, setYDelta] = useState(0)

	useEffect(() => {
		const page = ref.current
		page.addEventListener('touchstart', (e) => {
			setTouched(true)
			setTouchStart({
				x: e.touches[0].pageX,
				y: e.touches[0].pageY,
			})
		})
		page.addEventListener('touchend', (e) => {
			setTouched(false)
			setTouchEnd({
				x: e.changedTouches[0].pageX,
				y: e.changedTouches[0].pageY,
			})
		})

		return () => {
			page.removeEventListener('touchstart', (e) => {
				setTouchStart({
					x: e.touches[0].pageX,
					y: e.touches[0].pageY,
				})
			})
			page.removeEventListener('touchend', (e) => {
				setTouchEnd({
					x: e.changedTouches[0].pageX,
					y: e.changedTouches[0].pageY,
				})
			})
		}
	}, [])

	useEffect(() => {
		if (!touched) {
			setXDelta(touchStart.x - touchEnd.x)
			setYDelta(touchStart.y - touchEnd.y)
		}
	}, [touched])

	return { touchStart, touchEnd, xDelta, yDelta }
}

export default useTouch
