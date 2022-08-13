export const validateEmail = (email) => {
	return email.includes('@')
}

export const validatePassword = (password, confirmPassword) => {
	if (password.length < 8 || password != confirmPassword) return false
	const re = /([A-Z]+)([a-z]+)([0-9]+)([^A-Za-z0-9]+)/
	return password.match(re)
}
