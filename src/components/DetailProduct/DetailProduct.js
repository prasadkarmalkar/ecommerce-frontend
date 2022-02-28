import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { addReview, getOneProduct } from '../../actions/productActions';
import AddToCartButton from '../Home/AddToCartButton';
import StarRatings from 'react-star-ratings';
import './DetailProduct.css';
import Loader from '../Loader/Loader' 
import axios from '../../http-common';

function DetailProduct() {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const [ singleproduct, setSingleProduct ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const user = useSelector((state) => state.auth);
	var i = 0;
	useEffect(async () => {
		const res = await axios.get(`/product/${id}`);
		setSingleProduct(res.data);
		setLoading(false);
	}, []);

	// For Rating Product
	const [ userRating, setUserRating ] = useState(0);
	const [ userReview, setUserReview ] = useState('');
	const [ userName, setUserName ] = useState('');
	const changeRating = (newRating) => {
		setUserRating(newRating);
	};
	const handleSubmitReview = () => {
		if (user.isAuthenticated) {
			dispatch(addReview(id, { name: userName, rating: userRating, comment: userReview }));
			alert('Review Added');
		}
	};
	return loading ? <Loader></Loader> : (
		<div className="container-fluid">
			<div className="row mt-2">
				<div className="col-md-6 text-center">
					<img className="detailproduct__img img-fluid" src={singleproduct.img} alt="" />
				</div>
				<div className="mt-5 col-md-6">
					<h1>{singleproduct.title}</h1>
					<b>{singleproduct.category}</b>
					<br />
					<h2 className="mt-3">
						{singleproduct.price} Rs <small>{singleproduct.discount}% off</small>
					</h2>
					<h4>
						<del>{singleproduct.realprice} Rs</del>
					</h4>
					<div className="container ratings">
						<StarRatings rating={singleproduct.rating} starDimension="25px" starSpacing="7px" />
						<div className="rating-text">
							{' '}
							<span>{singleproduct.numReviews} reviews</span>{' '}
						</div>
					</div>
					<h5 className="mt-4 ">Description : </h5>
					<div className="container">
						<p className="">{singleproduct.description}</p>
					</div>
					<AddToCartButton id={singleproduct._id} />
				</div>
			</div>
			<div>
				<h1>Reviews</h1>
				<div className="container border p-3">
					<h3>Enter Your Review</h3>
					<b>Name: </b>{' '}
					<input
						type="text"
						className="form-control"
						onChange={(e) => setUserName(e.target.value)}
						name="name"
						id=""
					/>
					<b>Rating </b>
					<StarRatings
						rating={userRating}
						starDimension="25px"
						starSpacing="7px"
						starRatedColor="blue"
						changeRating={changeRating}
						numberOfStars={5}
						name="rating"
					/>
					<textarea
						name="review"
						rows="3"
						className="form-control"
						onChange={(e) => setUserReview(e.target.value)}
						value={userReview}
					/>
					<button className="btn btn-primary" onClick={handleSubmitReview}>
						Submit Review
					</button>
				</div>
				<div className="mt-5 container">
					{singleproduct.reviews.map((review) => {
						return (
							<div key={review._id}>
								<h4>{review.name}</h4>
								<b>Rating : </b>
								<StarRatings rating={review.rating} starDimension="25px" starSpacing="7px" />
								<p>
									<b>Review : </b>
									{review.comment}
								</p>
								<hr />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	) 
}

export default DetailProduct;
