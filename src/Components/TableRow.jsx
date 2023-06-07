import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/action";
import { library } from "../redux/library";

export default function TableRow(props) { 
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const prodData = library.product_details(props.pid)
  return (
    <tr className="mt-3">
      <td>{props.id+1}</td>
      <td>
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <img
              src={prodData.img}
              width={"100px"}
              alt=""
            />
          </div>
          <div className="col-md-12 col-lg-8 ms-auto">
            <b>Name :</b> {prodData.name}
            <br />
            <b>Price :</b> {prodData.actual_price}
            <br />
            <b>Discount :</b> {prodData.disc_price}
          </div>
        </div>
      </td>
      <td>
      <div className="col col-lg-12 ms-auto">
        <button
          className="btn btn-success mb-3"
          style={{borderRadius:"50%"}}
          disabled={props.quantity === 10 ? true : false}
          onClick={() =>
            dispatch({
              type: actions.INC_QTY,
              payload: props.id,
            })
          }
        >
          +
        </button>
        <br/>
        {/* <input className="mx-3 text-center"  value={props.quantity}></input> */}
        <span
          className=""
          style={{
            border: "2px black solid",
            padding: "5px 10px",
          }}
        >
        {props.quantity}
        </span>
        <br/>
        <button
          className=" btn btn-warning mt-3"
          style={{borderRadius:"50%"}}
          onClick={() =>  
            props.quantity > 1 ?
            dispatch({
              type: actions.DESC_QTY, 
              payload: props.id,
            })
            :
            dispatch({
              type: actions.REMOVE_PRODUCT,
              payload: props.id,
              qty: props.quantity,
            })
          }
          // disabled={
          //   props.quantity === 0 ? 
          //   true
          //  :
          //   false
          // }
        >
          -
        </button>
        </div>
      </td>
      <td> {state.cart[props.id].actual_amount}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch({
              type: actions.REMOVE_PRODUCT,
              payload: props.id,
              qty: props.quantity,
            })
          }
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
