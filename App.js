/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

// Redux store
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";

// Navigation
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  orders: ordersReducer,
  products: productsReducer,
  cart: cartReducer,
})

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
