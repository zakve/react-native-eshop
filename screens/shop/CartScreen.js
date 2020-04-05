import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';

// Components
import PriceSummary from "../../components/shop/PriceSummary";

// Constants
import Colors from "../../constants/Colors";

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems;
    })

    const orderHandler = param => {
        console.log("Order All")
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollview}>
            <SafeAreaView>
                <View>
                    <Text>CART ITEMS</Text>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.bottom}>
                <PriceSummary price={cartTotalAmount} buttonTitle="Order Now" orderHandler={orderHandler} />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        justifyContent: 'space-between'
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    amount: {
        color: Colors.accent
    },
    bottom: {
        backgroundColor: 'white'
    }
});

export default CartScreen;