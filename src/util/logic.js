export const validateEmail = (email) => {
	return email.includes('@')
}

export const validatePassword = (password, confirmPassword) => {
	if (password.length < 8 || password != confirmPassword) return false
	const re =
		/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/
	return password.match(re)
}
