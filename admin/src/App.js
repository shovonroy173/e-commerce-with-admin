import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>(state.user.currentUser));
  // console.log(user);


  return (
    <Router>
      {user && <Topbar />}
      <div className="container">
      {user &&<Sidebar />}
        <Routes>
        {!user && <Route exact path="/login"  element={<Login/>}/>}
        
        {/* <Route exact path="/login"  element={<Login/>}/> */}
      
          <Route exact path="/"  element={<Home />}/>
            
          <Route path="/users"  element={<UserList />}/>
            
          <Route path="/user/:userId"  element={ <User />}/>
           
          <Route path="/newUser"  element={<NewUser />}/>
            
          <Route path="/products"  element={<ProductList />}/>
            
          <Route path="/product/:productId"  element={<Product />}/>
            
          <Route path="/newproduct"  element={<NewProduct />}/>
            
        </Routes>
      </div>
    </Router>
  );
}

export default App;