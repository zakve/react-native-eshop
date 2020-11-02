import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "../../store/actions/orders";

import { CustomHeaderButton, Item } from '../../components/UI/HeaderButton'

// Constants
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (orders.length === 0) {
        return <View style={styles.emptyContainer}>
            <Text h4 style={styles.emptyText}>No orders</Text>
            <Icon
                name="landscape"
                size={70}
                color="grey"
            />
        </View>
    }

    return (
        orders.map((order, i) => (
            <ListItem
                key={i}
                title={order.readableDate}
                rightTitle={`$${order.totalAmount.toFixed(2)}`}
                bottomDivider
                chevron
                onPress={() => { props.navigation.navigate("OrderDetail", { order: order }) }}
            />
        ))
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <CustomHeaderButton>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </CustomHeaderButton>
        )
    }

}

export default OrdersScreen