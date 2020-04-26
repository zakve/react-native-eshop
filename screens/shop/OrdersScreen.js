import React from "react";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";

import { CustomHeaderButton, Item } from '../../components/UI/HeaderButton'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

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