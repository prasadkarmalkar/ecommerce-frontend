import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../actions/authActions'

function AccInfo(props) {
    const [email, setEmail] = useState('')
    const [mobile_number, setMobile_Number] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [edit, setEdit] = useState('readOnly')
    const user = useSelector(state => state.auth)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (user.isAuthenticated) {
            console.log(user)   
            setEmail(user.user.email);
            setMobile_Number(user.user.mobile_number)
            setAddress(user.user.address)
            setState(user.user.state)
            setPincode(user.user.pincode)
        }
    }, [user])
    const handleUpdate = ()=>{
        dispatch(update({mobile_number, address, state, pincode}))
        alert('User Updated Successfully')
    }
    return (

        <div className='container-fluid'>
            <h1>Account Information</h1>
            <button className='btn btn-dark'>Edit</button>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input type="tel" onChange={(e)=>setMobile_Number(e.target.value)} value={mobile_number} name="mobile_number" className="form-control" id="mobile_number" placeholder="Enter Mobile Number" />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea name="address"onChange={(e)=>setAddress(e.target.value)} value={address} className="form-control" id="address" placeholder="Enter Address" rows='3'></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" onChange={(e)=>setState(e.target.value)} value={state} name="state" className="form-control" id="state" placeholder="Enter State" />
            </div>
            <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" onChange={(e)=>setPincode(e.target.value)} value={pincode} name="pincode" className="form-control" id="pincode" placeholder="Enter Pincode" />
            </div>
            <button type="submit" onClick={handleUpdate} className="btn btn-primary">Update</button>
            <button className='btn btn-secondary'>Cancel</button>
        </div>
    )
}

export default AccInfo
