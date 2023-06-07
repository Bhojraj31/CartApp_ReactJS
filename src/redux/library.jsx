import ProductData from "../Data/ProductData"

export const library = {
    add_to_cart: (state, action) => {
        let newState;
        let flag = 0, pay_amount = 0, disc_amount = 0;
        if (action.payload !== null) {
            const newCart = [...state.cart];
            newCart.forEach((data, index) => {
                if (data.id === action.payload) {
                    flag = 1;
                    newCart[index].quantity = newCart[index].quantity + 1;
                    newCart[index].actual_amount += ProductData[action.payload-1].actual_price;
                    newCart[index].discont_amount += ProductData[action.payload-1].disc_price;
                }
            })
            // console.log(newCart);
            if (!flag) {
                newCart.push({
                    id: action.payload,
                    quantity: 1,
                    actual_amount: ProductData[action.payload-1].actual_price,
                    discont_amount: ProductData[action.payload-1].disc_price
                })
            }
            newCart.forEach((data, index)=>
                {   
                    pay_amount += newCart[index].actual_amount ;
                    disc_amount += newCart[index].discont_amount; 
                }
            )
            newState = {
                ...state,
                total: state.total + 1,
                cart: newCart,
                pay_amount: pay_amount,
                disc_amount: disc_amount
            }
        }
        // console.log(newState)
        library.add_to_ls(newState)
        return newState;
    },
    add_wishlist: (state, action) => {
        let newState;
        if (action.payload !== null) {
            if (state.wishlist.includes(action.payload))
                newState = state;
            else {
                const newWishlist = [...state.wishlist];
                newWishlist.push(action.payload);
                newState = {
                    ...state,
                    wishlist: newWishlist

                }

            }

        }
        library.add_to_ls(newState)
        return newState;
    },
    change_qty: function (state, action, flag) {
        let newState;
        let pay_amount = 0, disc_amount = 0;
        if (action.payload !== null) {
            const newCart = [...state.cart]
            let newTotal = state.total;
            console.log(action.payload)
            newCart.forEach((data, index) => {
                if (index === action.payload) {
                    if (flag) {
                        newTotal += 1
                        newCart[index].quantity = newCart[index].quantity + 1;
                        newCart[index].actual_amount += ProductData[data.id-1].actual_price;
                        newCart[index].discont_amount += ProductData[data.id-1].disc_price;
                    }
                    else {
                        newTotal -= 1
                        newCart[index].quantity = newCart[index].quantity - 1;
                        newCart[index].actual_amount -= ProductData[data.id-1].actual_price;
                        newCart[index].discont_amount -= ProductData[data.id-1].disc_price;
                    }

                }
                // newCart[index].actual_amount += newCart[index].actual_amount ;
                // newCart[index].discont_amount += newCart[index].discont_amount;
                
            })
            newCart.forEach((data, index)=>
                {   
                    pay_amount += newCart[index].actual_amount ;
                    disc_amount += newCart[index].discont_amount; 
                }
            )
            newState = {
                ...state,
                total: newTotal,
                canrt: newCart,
                pay_amount: pay_amount,
                disc_amount: disc_amount
            }
        }
        library.add_to_ls(newState)
        return newState;
    },
    remove_product: function (state, action) {
        let newState;
        let pay_amount = 0, disc_amount = 0;
        if (action.payload !== null) {
            const newCart = state.cart.filter(
                (cart, index) => {
                    if (index !== action.payload) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
            newCart.forEach((data, index)=>
                {   
                    pay_amount += newCart[index].actual_amount ;
                    disc_amount += newCart[index].discont_amount; 
                }
            )
            newState = {
                ...state,
                total: state.total - action.qty,
                cart: newCart,
                pay_amount: pay_amount,
                disc_amount: disc_amount
            }
        }
        library.add_to_ls(newState)
        return newState;
    },
    product_details: (id) => {
        let data
        ProductData.forEach(
            (product) => {
                if (product.id === id) {
                    data = product;
                    return;
                }
            }
        )
        return data;
    },
    coupon_details: (state) => {
        let coup ;
        coup = (state.disc_amount) * (state.disc_coupon.disc / 100)
        return coup;
    },
    update_state: (state, action) => {
        // console.log(action)
        return action.state;
    },
    add_to_ls: (data) => {
        // console.log(data)
        localStorage.setItem("state", JSON.stringify(data));
    }
}