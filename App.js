/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// Redux store
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <View></View>
    </Provider>
  );
};

export default App;
