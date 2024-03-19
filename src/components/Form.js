import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentList from './List';
function StudentForm() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [classSet, setClassSet] = useState('');
	const [birthDay, setBirthDay] = useState('');
	const [msg, setMsg] = useState('');

	const navigate = useNavigate();

	function AddStudent() {
		axios
			.post('https://mern-backend-421h.onrender.com/insert', {
				studentName: name,
				phoneNumber: phone,
				email: email,
				classGroup: classSet,
				dateOfBirth: birthDay,
			})
			.then(() => setMsg('Added new user'))
			.catch(() => setMsg('Failed to add new user'));
		navigate('/');
	}
	useEffect(() => {
		axios
			.get('https://mern-backend-421h.onrender.com/read')
			.then((res) => console.log(res));
	}, []);
	return (
		<div className="App">
			<div class="alert alert-success">
				{msg}
				<button
					type="button"
					class="close btn-close"
					data-bs-dismiss="alert"
				></button>
			</div>
			<h1> MERN CRUD</h1>
			<label>Student Name</label>
			<input
				type="text"
				placeholder="Name.."
				onChange={(event) => setName(event.target.value)}
			/>
			<label>Phone No</label>
			<input
				type="text"
				placeholder="Phone.."
				onChange={(event) => setPhone(event.target.value)}
			/>
			<label>Email</label>
			<input
				type="text"
				placeholder="Email.."
				onChange={(event) => setEmail(event.target.value)}
			/>
			<label>Class</label>
			<input
				type="text"
				placeholder="Class.."
				onChange={(event) => setClassSet(event.target.value)}
			/>
			<label>Date of Birth</label>
			<input
				type="text"
				placeholder="DD/MM/YY"
				onChange={(event) => setBirthDay(event.target.value)}
			/>
			<button onClick={() => AddStudent()} id="addBtn">
				Add Student to List
			</button>
			<StudentList msg={msg} setMsg={setMsg} />
		</div>
	);
}

export default StudentForm;
