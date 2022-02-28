import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { getProducts } from '../../actions/productActions';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader' 
function Home() {
	const params = useParams();
	const pageNumber = params.pageNumber || 1;
	const dispatch = useDispatch();
	const [ page, setPage ] = useState(pageNumber);
	const allproducts = useSelector((state) => state.products);
	useEffect(
		() => {
			dispatch(getProducts(page));
		},
		[ page ]
	);
	return (
		<>
		{allproducts.loading?<Loader></Loader>:
		<div>
			<Slider />
			<h1 className="mt-5">All Products</h1>
			<div className="container">
				<div className="row">
					{allproducts.products.map((product) => {
						return <Card key={product._id} product={product} />;
					})}
				</div>
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
		}
		</>
	);
}

export default Home;
