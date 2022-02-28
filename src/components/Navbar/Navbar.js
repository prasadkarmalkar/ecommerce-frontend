import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { logoutAdmin } from '../../actions/adminActions';
import logo from '../../images/logo.svg'
function Navbar() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const admin = useSelector((state) => state.admin);
	const logOutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
	};
	const logOutHandlerAdmin = (e) => {
		e.preventDefault();
		dispatch(logoutAdmin());
	};

	let navs = (
		<ul className="navbar-nav ms-auto me-5">
			<li className="nav-item active">
				<Link className="nav-link" to="/login">
					Log In
				</Link>
			</li>
			<li className="nav-item active">
				<Link className="nav-link" to="/signup">
					Sign Up
				</Link>
			</li>
		</ul>
	);

	if (admin.isAuthenticated) {
		navs = (
			<ul className="navbar-nav ms-auto me-5">
				<li className="nav-item">
					<Link className="nav-link" to="/admin">
						Dashboard
					</Link>
				</li>

				<li className="nav-item">
					<Link className="nav-link" to="/admin/addProduct">
						Add Product
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/admin/orders">
						Orders
					</Link>
				</li>
				<li className="nav-item">
					<a href="" className="nav-link" onClick={logOutHandlerAdmin}>
						Log Out
					</a>
				</li>
			</ul>
		);
	} else if (user.isAuthenticated) {
		navs = (
			<ul className="navbar-nav ms-auto me-5">
				<li className="nav-item">
					<Link className="nav-link" to="/cart">
						Cart
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/profile">
						Profile
					</Link>
				</li>
				<li className="nav-item">
					<a href="" className="nav-link" onClick={logOutHandler}>
						Log Out
					</a>
				</li>
			</ul>
		);
	}

	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark ">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img class="img-fluid"  width="50px" height="50px" src={logo} alt="" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{navs}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
