import React from "react";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        orders.map((l, i) => (
            <ListItem
                key={i}
                title={l.readableDate}
                rightTitle={`$${l.totalAmount.toFixed(2)}`}
                bottomDivider
                chevron
                onPress={() => { props.navigation.navigate("OrderDetail") }}
            />
        ))
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    }

}

export default OrdersScreen