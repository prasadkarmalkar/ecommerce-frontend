import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors} from '../../actions/errorActions'

import { useHistory } from 'react-router';
import { loadUser, login } from '../../actions/authActions';

function LogIn() {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)


    useEffect(()=>{
        dispatch(clearErrors())
    },[])
    useEffect(() => {
        if (auth.isAuthenticated) {
            alert('User Login Sucessfully')
            history.push('/')
        }
    }, [auth, error])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!auth.isAuthenticated) {
            dispatch(login({ email, password }))
        }
    }
    return (
        <div className='container mt-5 w-50'>
            <h3 className='mb-5'>Log In </h3>
            {error.errors.map((err) => {
                return (
                    <div className="alert alert-danger" role="alert">
                        {err.msg}
                    </div>
                )
            })}
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LogIn
