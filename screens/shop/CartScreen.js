import React, { useState } from 'react';
import { View, StyleSheet, Button, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { ListItem, Icon, Text } from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from "../../store/actions/orders";

// Components
import PriceSummary from "../../components/shop/PriceSummary";

// Constants
import Colors from "../../constants/Colors";

const CartScreen = props => {
    const dispatch = useDispatch();
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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const orderHandler = async (param) => {
        setIsLoading(true);
        await dispatch(addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }

    const removeHandler = pid => {
        dispatch(removeFromCart(pid))
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollview}>
            <SafeAreaView style={styles.flex}>
                {
                    cartItems.length === 0
                        ?
                        <View style={styles.emptyContainer}>
                            <Text h4 style={styles.emptyText}>Empty basket</Text>
                            <Icon
                                name="remove-shopping-cart"
                                size={70}
                                color="grey"
                            />
                        </View>
                        :
                        cartItems.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.productTitle}
                                rightTitle={`$ ${Math.round(item.sum.toFixed(2) * 100) / 100}`}
                                rightTitleStyle={styles.listPrice}
                                rightSubtitle={
                                    item.quantity.toString()
                                }
                                rightIcon={
                                    <Icon
                                        name='delete'
                                        color="grey"
                                        onPress={() => { removeHandler(item.productId) }}
                                    />
                                }
                                bottomDivider
                            />
                        ))
                }
            </SafeAreaView>
            <SafeAreaView style={styles.bottom}>
                <PriceSummary
                    title="Total amount"
                    price={cartTotalAmount}
                    buttonTitle="Order Now"
                    buttonState={isLoading}
                    orderHandler={() => { orderHandler() }}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
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
    },
    listPrice: {
        color: Colors.primary
    },
    emptyContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        color: "grey",
        marginBottom: 20
    }
});

export default CartScreen;