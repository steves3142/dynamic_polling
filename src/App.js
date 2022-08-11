import { Routes, Route } from 'react-router-dom';
import Student from './pages/Student';
import Host from './pages/Host';
import styles from './styles/App.module.css';

function App() {
	return (
		<div className={styles.container}>
			<Routes>
				<Route path='/' element={<div>Home Page</div>} />
				<Route path='/student' element={<Student />} />
				<Route path='/host' element={<Host />} />
			</Routes>
		</div>
	);
}

export default App;
