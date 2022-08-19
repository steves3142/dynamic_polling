import Client from './api'

export const restoreSession = async () => {
	try {
		// Checks if the current token if it exists is valid
		const res = await Client.get('/api/account/session')
		return res.data.user
	} catch (error) {
		throw error
	}
}

export const getRoomList = async (owner_id) => {
	try {
		const res = await Client.get(`/api/room/rooms/${owner_id}`)
		return res.data
	} catch (error) {
		throw error
	}
}
