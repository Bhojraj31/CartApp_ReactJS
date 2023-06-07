import React from 'react'
import { actions } from '../redux/action'
import { useDispatch } from 'react-redux'
export default function Card(props) {
    const dispatch = useDispatch()
    return (
        <div className='col-md-4 col-sm-6 '>
            <div className="card" style={{ height: 600, marginTop: "76px"}}>
                <img src={props.img} className="card-img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">
                        {props.desc}
                        <br />
                        <br />
                        <b>Actual price: </b>{props.actual_price}
                        <br />
                        <b>Discounted price: </b>{props.disc_price}
                    </p>
                    <button onClick={() => {
                        dispatch({
                            type: actions.ADD_PRODUCT,
                            payload: props.id
                        })
                    }} className='btn btn-primary m-2'><i className="fa-solid fa-cart-shopping"></i></button>
                    <button onClick={() => {
                        dispatch({
                            type: actions.WISHLIST,
                            payload: props.id
                        })
                    }} className='btn btn-danger m-2'><i className="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>

    )
}
