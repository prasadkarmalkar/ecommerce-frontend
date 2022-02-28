import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "../../http-common";
import { tokenConfigAdmin } from "../../helper/tokenConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

function AdminOrders() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  // For pagination
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const [page, setPage] = useState(pageNumber);
  const history = useHistory();

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const orderStatuses = ['placed','confirm','dispatch','delivered']
  // To Get Orders
  const getOrders = (p) => {
    axios
      .get(`/order/admin?page=${p}&limit=50`, tokenConfigAdmin())
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => alert("Something went wrong please try again"));
  };

  useEffect(() => {
    if (admin.isAuthenticated === false) {
      history.push("/admin/login");
    } else if (admin.isAuthenticated === true) {
      getOrders(page);
    }
  }, [admin, page]);


  // Handle Status Change
  const handleStatusChange = (s,i) =>{
    setLoading(true);
    axios.put(`/order/admin/${i}`,{status:s},tokenConfigAdmin()).then((res)=>{
      getOrders(page);
    }).catch((err)=> alert('Something went wrong please try again'))

  }





  return loading ? (
    <Loader></Loader>
  ) : (
    <div className="container-fluid">
      <h3>All Products</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Products</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Address</th>
              <th scope="col">Payment Method</th>
              <th scope="col"> Order Status</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li>{product.title}</li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalamount}</td>
                <td>
                  {order.address},{order.state},{order.pincode}
                </td>
                <td>{order.payment.method}</td>
                <td>
                 
                  <div className="dropdown">
                    <button
                      className="btn btn-warning dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {order.status}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                        {order.status != 'placed' && <a onClick={()=> handleStatusChange('placed',order._id)} class="dropdown-item" >
                        Placed
                      </a> }
                      {order.status != 'confirmed' && <a onClick={()=> handleStatusChange('confirmed',order._id)} class="dropdown-item" >
                        Confirmed
                      </a> }
                      {order.status != 'dispatched' && <a  onClick={()=> handleStatusChange('dispatched',order._id)} class="dropdown-item" >
                        Dispatched
                      </a> }
                      {order.status != 'delivered' && <a onClick={()=> handleStatusChange('delivered',order._id)} class="dropdown-item" >
                        Delivered
                      </a> }
                      {order.status != 'cancelled' && <a onClick={()=> handleStatusChange('cancelled',order._id)} class="dropdown-item" >
                        Cancelled
                      </a> }
                      
                    </div>
                  </div>
                </td>
                <td>{order.isPaymentDone ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
