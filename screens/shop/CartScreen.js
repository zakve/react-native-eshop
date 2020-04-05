import React from 'react';
import { View, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { ListItem, Icon, Text } from 'react-native-elements'

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
                                rightTitle={`$${item.sum}`}
                                rightSubtitle={item.quantity.toString()}
                                rightIcon={
                                    <Icon
                                        name='delete'
                                        onPress={() => { }}
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
                    orderHandler={orderHandler}
                />
            </SafeAreaView>
        </ScrollView>
    )
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