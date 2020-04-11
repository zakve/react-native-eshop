import { ADD_ORDER } from "../actions/order"
import Order from "../../models/order"

const initialSteta = {
    orders: []
}

export default (state = initialSteta, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state;
    }
}