/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

// Redux store
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth"
import ReduxThunk from "redux-thunk";

// Navigation
import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  orders: ordersReducer,
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
