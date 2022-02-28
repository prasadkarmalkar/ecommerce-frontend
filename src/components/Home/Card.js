import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'
import './Card.css'
function Card(props) {

    return (
        <div className="col-3">
            <div className="card card__product">
                <img  className="card__img" src={props.product.img} alt="Card image cap" />
                <div className="card-body">
                <Link to={{pathname:`/product/${props.product._id}`}}><h5 className="card-title">{props.product.title}</h5></Link>
                <p className="card-text">{props.product.category}</p>
                <h6><b>Price: {props.product.price} Rs</b></h6>
                <p><b>MRP: <del>{props.product.realprice} Rs</del></b></p>
                <AddToCartButton id={props.product._id}></AddToCartButton>
                </div>
            </div>
        </div>
    )
}

export default Card
