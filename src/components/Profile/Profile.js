import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import AccInfo from './AccInfo'
import MyOrders from './MyOrders'
import ResetPassword from './ResetPassword'

function Profile() {
    const history = useHistory();

    let match = useRouteMatch();

    const user = useSelector(state => state.auth)
    useEffect(() => {
        if (user.isAuthenticated) {
            console.log(user)
        } else if (user.isAuthenticated == false) {
            history.push('/')
        }
    }, [user])
    return (
        <div className='container-fluid'>
            <h1 className='mt-5 ms-5'>Profile</h1>
            <div className="mt-5 row">
                <div className="col-3">
                    <ul className='bg-dark'>
                        <Link to={`${match.url}`}><li className='mt-4 text-white'>Account Information</li></Link>
                        <Link to={`${match.url}/myorders`}><li className='mt-4  text-white'>My Orders</li></Link>
                        <Link to={`${match.url}/resetpassword`}><li className='mt-4  text-white'>Reset Password</li></Link>
                        <li className=' mt-4 text-white'>Log Out</li>
                    </ul>
                </div>
                <div className="col-9">
                    <Switch>
                        <Route path={`${match.path}/myorders`}>
                            <MyOrders></MyOrders>
                        </Route>
                        <Route path={`${match.path}/resetpassword`}>
                            <ResetPassword></ResetPassword>
                        </Route>
                        <Route path={`${match.path}`}>
                            <AccInfo></AccInfo>
                        </Route>
                    </Switch>

                </div>
            </div>
        </div>
    )
}

export default Profile
