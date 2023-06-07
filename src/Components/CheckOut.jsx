import React, { useState } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import Coupon from "../Data/Coupons";
import { library } from "../redux/library";

const Checkout = () => {  
  const state = useSelector((state) => state);
  const count = useSelector((state) => state.total);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    mode: 1
  });
  const [coupon, setCoupon] = useState(0);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  
  const dataChange = (event) => {
    let newData = {}, value = "";
    if (event.target.name === "first_name") {
        value = event.target.value
        newData = {
            ...user,
            first_name: value
        }
    } else if (event.target.name === "last_name") {
        value = event.target.value
        newData = {
            ...user,
            last_name: value
        }
    } else if (event.target.name === "mode") {
        value = event.target.value
        newData = {
            ...user,
            mode: value
        }
    }

    console.log(newData)
    setUser(newData)

}

  const sumitHandler = (event) => {
    setError("");

    if (event.target.first_name.value !== "" && event.target.email.value !== "" &&
        event.target.phone_no.value !== "" && event.target.address.value !== "" &&
        event.target.last_name.value !== "") 
      {
        setUser({
            firstname: event.target.first_name.value,
            lastname: event.target.last_name.value,
            email: event.target.email.value,
            address: event.target.address.value,
        })
        setFlag(true);
      }
    else {
        setError(<h3 style={{ color: "red" }}>"Please fill all the required details !!!"</h3>);
    }
    event.preventDefault();
  }
  
  const optionList = Coupon.map(
    (element , index) => {
      return <option label={element.disc + " % off "} key={index}>
        {element.name}
      </option>
    }
  )
  const couponApply = (event) =>{
    event.target.nextSibling.innerText = "";
    const result = event.target.value;
    const Filtter = Coupon.filter(
      (code) => code.name === result 
    )
    if(Filtter.lenght === 0)
    {
      event.target.nextSibling.innerText = " does not exist";
    }
    else
    {
      state.disc_coupon = Filtter[0]
      event.target.nextSibling.innerText = ` ${Filtter[0].disc} % off`
      setCoupon(library.coupon_details(state)) 
    }
  }
  // console.log(coupon);
  return (
    <Container>
      {/* {flag === true ?  
        <> */}
          <div className="checkout" style={{ marginTop: "100px" }}>
            <div className="row g-5">
              <div className="col-md-7 col-lg-8" style={{borderStyle:"inset"}}>
                <h1 className="text-center">Billing Address</h1>
                <form onSubmit={sumitHandler}>
                <div className="row g-3 ">
                  <div className="col-sm-6">
                    <label className="form-label">First name</label>
                    <input type="text" onChange={dataChange} value={user.first_name} className="form-control" id="firstName" name="first_name" placeholder="Enter your first name" />
                  </div>

                  <div className="col-sm-6">
                    <label for="lastName" className="form-label">Last name</label>
                    <input type="text" onChange={dataChange} value={user.last_name} className="form-control" id="lastName" name="last_name"placeholder="Enter your last name" />
                  </div>

                  <div className="col-12">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="you@example.com"/>
                  </div>

                  <div className="col-12">
                    <label for="address" className="form-label">Address</label>
                    <textarea type="Textarea1" className="form-control" name="address" id="address" placeholder="1234 Main St" required=""/>
                  </div>

                  <hr className="my-4"></hr>
                
                  <h4 className="mb-3">Payment</h4>
                
                  <div className="my-3">
                    <div className="form-check">
                      <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required=""/>
                      <label className="form-check-label" for="debit">Cash On Delivery</label>
                    </div> 
                  </div>
                  
                  <div className='mt-2'>{error}</div>
                  <button className="btn btn-primary btn-lg" type="submit">Place Order</button>          
                </div>
                </form>
              </div>
              <div className="col-md-5 col-lg-4 " style={{borderStyle:"outset"}}>
                <div className="mt-5">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-primary">Your cart</span>
                  <span className="badge bg-primary rounded-pill">{count}</span>
                </h4>
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
                      <td>{state.pay_amount - state.disc_amount - coupon}</td>
                    </tr>
                  </tbody>
                </table>
                <input className="mr-2" type="text" placeholder="Enter code here" list="coupon" onBlur={couponApply} style={{marginRight:"22px"}} />
                <span>
                  
                </span>
                <datalist id="coupon">{optionList}</datalist>    
                </div>
              </div>
            </div>
        
          </div>
        {/* </>
        :
        <div className='col-md-4 offset-4 ' style={{ marginTop: "100px" }}>
            <h1 className="text-center">
              Congratulation 
            </h1>
            <br/>
            <h3>Your order has been placed  </h3>
            <h3 className="text-center">
                successfully!!😊
            </h3>
        </div>
      }  */}
    </Container>
  );
};

export default Checkout;
