import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useHistory } from 'react-router-dom';

import { deleteProduct, getProducts } from '../../actions/productActions';
import './Admin.css';
import Loader from '../Loader/Loader' 

function Admin() {
	// For pagination
	const params = useParams();
	const pageNumber = params.pageNumber || 1;
	const [ page, setPage ] = useState(pageNumber);

	const history = useHistory();

	const dispatch = useDispatch();
	const allproducts = useSelector((state) => state.products);
	const admin = useSelector((state) => state.admin);

	useEffect(
		() => {
			if (admin.isAuthenticated === false) {
				history.push('/admin/login');
			} else {
				dispatch(getProducts(page));
			}
		},
		[ admin, page ]
	);

	const handleDelete = (id) => {
		if (admin.isAuthenticated) {
			dispatch(deleteProduct(id));
		}
	};
	const handleUpdate = (id) => {
		if (admin.isAuthenticated) {
			history.push(`/admin/addProduct/${id}`);
		}
	};

	return (
		allproducts.loading?<Loader></Loader>:
		<div className="container-fluid">
			<h3>All Products</h3>
			<div className="table-responsive">
				<table className="table table-hover align-middle">
					<thead>
						<tr>
							<th scope="col">Image</th>
							<th scope="col">Title</th>
							<th scope="col">Category</th>
							<th scope="col">Description</th>
							<th scope="col">Real Price</th>
							<th scope="col">Discount</th>
							<th scope="col">Discounted Price</th>
							<th scope="col">Stock</th>
							<th scope="col">Update</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{allproducts.products.map((product) => {
							return (
								<tr key={product._id}>
									<td>
										<img
											width="100px"
											className="admin__product__img rounded float-start"
											src={product.img}
											alt=""
										/>
									</td>
									<td>{product.title}</td>
									<td>{product.category}</td>
									<td>{product.description}</td>
									<td>{product.realprice} Rs</td>
									<td>{product.discount} %</td>
									<td>{product.price} Rs</td>
									<td>{product.stock}</td>
									<td>
										<a onClick={() => handleUpdate(product._id)}>Update</a>
									</td>
									<td>
										<a href="" onClick={() => handleDelete(product._id)}>
											Delete{' '}
										</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			{allproducts.pages > 1 && (
				<div className="text-center p-3 ">
					<button
						className="btn btn-dark me-3"
						onClick={() => setPage((page) => page - 1)}
						disabled={page === 1}
					>
						&#171;
					</button>

					<button
						className="btn btn-dark"
						onClick={() => setPage((page) => page + 1)}
						disabled={page === allproducts.pages}
					>
						&#187;
					</button>
				</div>
			)}
		</div>
			
	);
}

export default Admin;
