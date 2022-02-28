import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../actions/cartActions'

function AddToCartButton(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const addToCartHandler = (e) => {
        e.preventDefault()
        if (user.isAuthenticated) {
            dispatch(addToCart(props.id, 1))
        } else {
            alert('Please Log In')
        }
    }
    return (
        <a href="" onClick={addToCartHandler} className="btn btn-primary">Add To Cart</a>
    )
}

export default AddToCartButton
