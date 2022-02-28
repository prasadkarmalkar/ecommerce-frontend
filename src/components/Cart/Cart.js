import React, { useEffect, useRef, useState } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, getCart } from '../../actions/cartActions';
import { useHistory } from 'react-router';
import { update } from '../../actions/authActions';
import { clearOrder, createOrder } from '../../actions/orderActions';
import Loader from '../Loader/Loader';
function Cart() {
	const history = useHistory();
	const modalBtn = useRef(null);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth);
	const order = useSelector((state) => state.order);
	// for modal
	const [ address, setAddress ] = useState(null);
	const [ state, setState ] = useState(null);
	const [ pincode, setPincode ] = useState(null);
	const [ isModal, setIsModal ] = useState(false);
	useEffect(() => {
		if (user.isAuthenticated) {
			if (user.user.address == null || user.user.state == null || user.user.pincode == null) {
				console.log('hey??')
				if (modalBtn.current != null && isModal == false) {
					console.log('hello?')
					modalBtn.current.click();
					setIsModal(true);
				}
			}
		}
	});
	useEffect(
		() => {
			if (user.isAuthenticated) {
				setAddress(user.user.address);
				setState(user.user.state);
				setPincode(user.user.pincode);
				dispatch(getCart());
			} else if (user.isAuthenticated == false) {
				history.push('/');
			}
		},
		[ user ]
	);

	// Handling Address Submit in modal
	const handleAddressSubmit = () => {
		let mobile_number = user.user.mobile_number;
		console.log(address);
		dispatch(update({ mobile_number, address, state, pincode }));
		setIsModal(false);
		modalBtn.current.click();
	};

	// FOr Checkout
	useEffect(
		() => {
			if (user.isAuthenticated && order.order) {
				alert('Order Placed Sucessfully Your order id is : ' + order.order._id);
				cart.cart.products.map((product) => {
					dispatch(deleteFromCart(product._id));
				});
				dispatch(clearOrder());
				history.push('/');
			}
		},
		[ order ]
	);
	// Handle The Checkout
	const handleCheckout = async () => {
		if (
			user.isAuthenticated &&
			user.user.address !== null &&
			user.user.state !== null &&
			user.user.pincode !== null
		) {
			dispatch(createOrder());
		}
	};

	return cart.cart && user.user ? (
		cart.loading?<Loader></Loader>:
		<div className="container-fluid">
			<div className="row mt-5">
				<h2 className="col-10">Shopping Cart</h2>
				<b className="col-2">{cart.cart.products.length} Items</b>
			</div>
			<hr />
			<div className="row mt-4">
				<div className="col-8">
					<div className="row mb-3">
						<b className="col-5 text-center">Product</b>
						<b className="col-3 text-center">Qty</b>
						<b className="col-3 text-center">Price</b>
						<b />
					</div>
					{cart.cart.products.map((product) => {
						return <CartItem key={product._id} product={product} />;
					})}
				</div>
				<div className="col-4 border p-4">
					<h4 className="text-center">Checkout</h4>
					<hr />
					<div className="row mt-4 p-4">
						<h5 className="col-6">Total : </h5>
						<h5 className="col-6 text-end">{cart.cart.totalamount} Rs.</h5>
						<h5 className="mt-4">Address: </h5>
						<textarea
							className=" mt-2 form-control"
							type="text"
							rows="3"
							name="address"
							id=""
							readOnly
							value={`${user.user.address}, ${user.user.state}, ${user.user.pincode}`}
						/>
						<button onClick={handleCheckout} className="mt-4 btn btn-primary">
							Checkout
						</button>
					</div>
				</div>
			</div>
			<button
				ref={modalBtn}
				type="button"
				class="btn btn-primary d-none"
				data-toggle="modal"
				data-target="#staticBackdrop"
			>
				Launch static backdrop modal
			</button>

			<div
				class="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="false"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">
								Enter Your Address
							</h5>
						</div>
						<div class="modal-body">
							<div className="form-group">
								<label htmlFor="address">Address</label>
								<textarea
									name="address"
									onChange={(e) => setAddress(e.target.value)}
									value={address}
									className="form-control"
									id="address"
									placeholder="Enter Address"
									rows="3"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="state">State</label>
								<input
									type="text"
									onChange={(e) => setState(e.target.value)}
									value={state}
									name="state"
									className="form-control"
									id="state"
									placeholder="Enter State"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="pincode">Pincode</label>
								<input
									type="text"
									onChange={(e) => setPincode(e.target.value)}
									value={pincode}
									name="pincode"
									className="form-control"
									id="pincode"
									placeholder="Enter Pincode"
								/>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" onClick={handleAddressSubmit} class="btn btn-primary">
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div>Loading</div>
	);
}

export default Cart;
