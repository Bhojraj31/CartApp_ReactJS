import Product from "./Components/Product.jsx";
import Cart from "./Components/Cart.jsx";
import Header from "./Components/Header.jsx";
import CheckOut from "./Components/CheckOut"
import { actions } from './redux/action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("state"));
    console.log(localState)
    if (localState !== null) {
      dispatch({
        type: actions.UPDATE_STATE,
        state: localState
      })
    }

  }, [])
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Product/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={<CheckOut/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
