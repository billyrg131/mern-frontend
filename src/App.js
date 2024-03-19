import './App.css';
import StudentForm from './components/Form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router';
function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<StudentForm />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
