import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/authActions";
import Cart from "./components/Cart/Cart";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import Profile from "./components/Profile/Profile";
import AdminLogin from "./components/Admin/AdminLogin";
import Admin from "./components/Admin/Admin";
import { loadAdmin } from "./actions/adminActions";
import AddProduct from "./components/Admin/AddProduct";
import AdminOrders from "./components/Admin/AdminOrders";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // dispatch(loadUser())
    dispatch(loadUser());
    dispatch(loadAdmin());
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/product/:id">
            <DetailProduct />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/admin/login">
            <AdminLogin />
          </Route>
          <Route path="/admin/addProduct/:id">
            <AddProduct />
          </Route>
          <Route path="/admin/addProduct">
            <AddProduct />
          </Route>
          <Route path="/admin/orders">
            <AdminOrders />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/:pageNumber" component={Home} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
