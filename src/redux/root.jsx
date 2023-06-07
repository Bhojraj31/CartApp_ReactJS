import ProductData from '../Data/ProductData';
import { actions } from './action';
import { library } from './library';
const initState = {
    products: ProductData,
    cart: [],
    wishlist: [],
    total: 0,
    pay_amount: 0,
    disc_amount: 0,
    disc_coupon: {},
}

export const root = (state = initState, action) => {
    let newState;
    switch (action.type) {
        case actions.ADD_PRODUCT:
            newState = library.add_to_cart(state, action);
            // localStorage.setItem("state", JSON.stringify(ProductData));
            break;
        case action.WISHLIST:
            newState = library.add_wishlist(state, action);
            // localStorage.setItem("state", JSON.stringify(ProductData));
            break;
        case actions.INC_QTY:
            newState = library.change_qty(state, action, 1);
            // localStorage.setItem("state", JSON.stringify(ProductData));
            break;
        case actions.DESC_QTY:
            newState = library.change_qty(state, action, 0);
            // localStorage.setItem("state", JSON.stringify(ProductData));
            break;
        case actions.REMOVE_PRODUCT:
            newState = library.remove_product(state, action);
            // localStorage.setItem("state", JSON.stringify(ProductData));
            break;
        default:
            newState = state
    }
    return newState;
}