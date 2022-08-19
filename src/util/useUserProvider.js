import { useState, createContext, useMemo, useContext } from 'react'

const UserContext = createContext(null)
const AccountInfoContext = createContext(null)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [accountInfo, setAccountInfo] = useState(null)

	const userValue = useMemo(() => {
		return { user, setUser }
	}, [user])

	const accountInfoValue = useMemo(() => {
		return { accountInfo, setAccountInfo }
	}, [accountInfo])

	return (
		<UserContext.Provider value={userValue}>
			<AccountInfoContext.Provider value={accountInfoValue}>{children}</AccountInfoContext.Provider>
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	return useContext(UserContext)
}

export const useAccountInfoContext = () => {
	return useContext(AccountInfoContext)
}
