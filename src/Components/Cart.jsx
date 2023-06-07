import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";
const Cart = () => {
  const state = useSelector((state) => state);
  let tableBody;
  if (state.cart.length === 0) {
    tableBody = (
      <tr className="text-center">
        <td colSpan="5">
          <h1 className="py-5">  Cart is Empty <i className="fa-solid fa-bag-shopping"></i>
          </h1>
        </td>
      </tr>
    );
  } else {
    tableBody = state.cart.map((cart, index) => {
      return <TableRow id={index} pid={cart.id} quantity={cart.quantity} key={index}/>
    });
  }
  
  return (
    <>
      <Container>
        <div className="container mt-5">
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Details</th>
                <th scope="col">Count</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
          <div className="row mt-5 ">
            <div className="col-6 border p-3 offset-6 ">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <b>GT</b>
                    </td>
                    <td>{state.pay_amount}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Discount</b>
                    </td>
                    <td>{state.disc_amount}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Payable</b>
                    </td>
                    <td>{state.pay_amount - state.disc_amount}</td>
                  </tr>
                </tbody>
              </table>
              
              <button className="btn btn-warning mt-3 "
               disabled={state.cart.length === 0 ? true : false} 
              >
              <Link to="/checkout" style={{color:"black" , textDecoration: "none", }}>
               Check out
              </Link>
              </button>
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
