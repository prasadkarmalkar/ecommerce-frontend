import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../actions/cartActions';
function CartItem(props) {

    const dispatch = useDispatch();
    const incQtyHandler = (e) => {
        dispatch(addToCart(props.product.productId, 1))
    }
    const decQtyHandler = (e) => {
        if (props.product.quantity > 1) {
            dispatch(addToCart(props.product.productId, -1))
        }
    }
    const deleteFromCartHandler = ()=>{
        dispatch(deleteFromCart(props.product._id))
    }
    return (
        <div className='row align-items-center mt-3'>
            <img className='col-2' src={props.product.img} alt="" />
            <div className='col-3'>
                <b>{props.product.title}</b>
                <br></br>
                <small>{props.product.category}</small>
            </div>
            <div className="col-3">
                <div className="row">
                    <button onClick={incQtyHandler} className=' col-3 btn btn-secondary'>+</button>
                    <div className="col-6">
                        <input className='form-control' value={props.product.quantity} type="number" name="quantity" id="" readOnly />
                    </div>
                    <button onClick={decQtyHandler} className='col-3 btn btn-secondary'>-</button>
                </div>
            </div>
            <b className="col-3 text-center">
                Rs {props.product.price}
            </b>
            <i onClick={deleteFromCartHandler} className="col-1 fa fa-trash"></i>
            


        </div>
    )
}

export default CartItem
