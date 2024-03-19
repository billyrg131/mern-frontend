import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateForm from './Update';
import { useNavigate } from 'react-router-dom';

function StudentList() {
	const [students, setStudents] = useState([]);
	const [ifUpdate, showUpdate] = useState(false);
	const [msg, setMsg] = useState('');
	const [newPhone, setNewPhone] = useState(0);
	const [newEmail, setNewEmail] = useState('');
	const [newClass, setNewClass] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get('https://mern-backend-421h.onrender.com/read')
			.then((res) => setStudents(res.data))
			.catch((err) => console.log(err));
	}, []);
	function UpdateStudent(id) {
		axios
			.put('https://mern-backend-421h.onrender.com/update', {
				id: id,
				newEmail: newEmail,
				newPhone: newPhone,
				newClass: newClass,
			})
			.then(() => setMsg('Updated student data'))
			.catch(() => setMsg('Failed to update'));
		navigate('/');
	}
	function DeleteStudent(id) {
		axios
			.delete(`https://mern-backend-421h.onrender.com/delete/${id}`)
			.then(() => {
				setMsg('Deleted');
			});
	}

	console.log(setStudents);
	return (
		<div>
			<h1>Students</h1>

			<div class="alert alert-success">
				{msg}
				<button
					type="button"
					class="close btn-close"
					data-bs-dismiss="alert"
				></button>
			</div>

			{students.map((student, index) => {
				return (
					<>
						<div
							key={index}
							style={{
								margin: '26px',
								fontSize: '17px',
								border: '1px solid black',
								padding: '10px',
							}}
						>
							<p>Name: {student.studentName}</p>
							<p>Email: {student.email}</p>
							<p>Phone: +254{student.phoneNumber}</p>
							<p>Class: {student.classGroup}</p>
							<p>D.O.B: {student.dateOfBirth}</p>
							<div className="btnDiv">
								{ifUpdate === true ? (
									<div>
										<UpdateForm
											newEmail={student.email}
											setNewEmail={setNewEmail}
											newPhone={student.phoneNumber}
											setNewPhone={setNewPhone}
											newClass={student.classGroup}
											setNewClass={setNewClass}
										/>
										<button onClick={() => UpdateStudent(student._id)}>
											Update
										</button>
									</div>
								) : (
									<div>
										<button onClick={() => showUpdate(true)} className="edit">
											<i className="fa fa-edit fa-2x"></i>
										</button>
									</div>
								)}
								<button
									onClick={() => DeleteStudent(student._id)}
									className="delete"
								>
									<i className="fa fa-trash fa-2x"></i>
								</button>
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default StudentList;
