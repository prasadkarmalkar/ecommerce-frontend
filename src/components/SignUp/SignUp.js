import React, { useEffect, useState } from 'react'
import { register} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

function SignUp() {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [mobile_number, setMobile_Number] = useState('')
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)


    useEffect(()=>{
        dispatch(clearErrors())
    },[])
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/')
        }
    }, [auth, error])
    const submitForm = async (e) => {
        e.preventDefault()
        if (!error.message)
            console.log(email, mobile_number, password)
        const user = {
            email, mobile_number, password
        }
        dispatch(register(user))
    }
    return (
        <div className='container w-50 mt-5'>
            <h3 className='mb-5'>Create New Account</h3>
            <form onSubmit={submitForm}>
                {error.errors.map((err) => {
                    return (
                        <div className="alert alert-danger" role="alert">
                            {err.msg}
                        </div>
                    )
                })}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={(e) => setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input type="tel" name="mobile_number" onChange={(e) => setMobile_Number(e.target.value)} value={mobile_number} className="form-control" id="mobile_number" placeholder="Enter Mobile Number" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Password Confirm</label>
                    <input type="password" className="form-control" id="password-confirm" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
