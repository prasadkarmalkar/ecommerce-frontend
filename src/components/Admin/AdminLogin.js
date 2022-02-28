import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { loginAdmin } from '../../actions/adminActions';
import { logout } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
function AdminLogin() {
	const history = useHistory();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();
	const admin = useSelector((state) => state.admin);
	const error = useSelector((state) => state.error);
	useEffect(() => {
		dispatch(logout());
		dispatch(clearErrors());
	}, []);
	useEffect(
		() => {
			if (admin.isAuthenticated) {
				alert('Admin Login Sucessfully');
				history.push('/admin');
			}
		},
		[ admin, error ]
	);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!admin.isAuthenticated) {
			dispatch(loginAdmin({ email, password }));
		}
	};

	return (
		<div className="container">
			<h1 className="text-center mt-3">ADMIN LOGIN</h1>
			{error.errors.map((err) => {
				return (
					<div className="alert alert-danger" role="alert">
						{err.msg}
					</div>
				);
			})}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
}

export default AdminLogin;
