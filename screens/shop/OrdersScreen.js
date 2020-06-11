import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, ListItem } from "react-native-elements";
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
    }
});

OrdersScreen.navigationOptions = navData => {
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