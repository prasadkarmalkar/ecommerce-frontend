import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/productActions';
import { useHistory } from 'react-router';
import { clearErrors } from '../../actions/errorActions';

function AddProduct() {
	const history = useHistory();
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ discount, setDiscount ] = useState(0);
	const [ realprice, setRealprice ] = useState(0);
	const [ stock, setStock ] = useState('');
	const [ img, setImg ] = useState('');
	const dispatch = useDispatch();

	const error = useSelector((state) => state.error);
	const admin = useSelector((state) => state.admin);

	useEffect(() => {
		dispatch(clearErrors());
	}, []);

	useEffect(
		() => {
			if (discount > 0 && realprice > 0 && discount < 100) {
				var numVal2 = Number(discount) / 100;
				setPrice(Math.floor(realprice - realprice * numVal2));
			}
			if (discount == 0) {
				setPrice(realprice);
			}
		},
		[ discount, realprice ]
	);

	useEffect(
		() => {
			if (admin.isAuthenticated === false) {
				history.push('/admin/login');
			}
		},
		[ admin ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		let form = document.getElementById('form');
		const formdata = new FormData(form);
		dispatch(addProduct(formdata));
		if (error.status == 200) {
			alert('Product Added Successfully');
			history.push('/admin');
		}
	};

	return (
		<div className="container">
			<h3 className="mt-3">Add Product</h3>
			{error.errors.map((err) => {
				return (
					<div className="alert alert-danger" role="alert">
						{err.msg}
					</div>
				);
			})}
			<form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="form-group">
					<label htmlFor="title">Product Title</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						placeholder="Enter Product Title"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						className="form-control"
						id="description"
						placeholder="Enter Description"
						rows="4"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="category">Category</label>
					<input
						type="text"
						name="category"
						onChange={(e) => setCategory(e.target.value)}
						value={category}
						className="form-control"
						id="category"
						placeholder="Enter Category"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="img">Product Image</label>
					<input
						type="file"
						accept=".png, .jpg, .jpeg"
						name="img"
						onChange={(e) => setImg(e.target.value)}
						value={img}
						className="form-control"
						id="img"
						placeholder="Enter Image"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="realprice">Price</label>
					<input
						type="text"
						name="realprice"
						onChange={(e) => {
							setRealprice(e.target.value);
						}}
						value={realprice}
						className="form-control"
						id="realprice"
						placeholder="Enter price"
					/>
					<b>Discounted Price will be {price}</b>
				</div>
				<div className="form-group">
					<label htmlFor="discount">Discount (In %)</label>
					<input
						type="text"
						name="discount"
						onChange={(e) => {
							setDiscount(e.target.value);
						}}
						value={discount}
						className="form-control"
						id="discount"
						placeholder="Enter Discount"
					/>
				</div>
				<div className="form-group">
					<input
						type="hidden"
						name="price"
						value={price}
						className="form-control"
						id="price"
						placeholder="Enter price"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="stock">Stock</label>
					<input
						type="text"
						name="stock"
						onChange={(e) => setStock(e.target.value)}
						value={stock}
						className="form-control"
						id="stock"
						placeholder="Stock"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default AddProduct;
