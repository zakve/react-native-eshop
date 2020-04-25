import React from "react";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";

const OrderDetailScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <View>
            <Text>Order detail</Text>
        </View>
    )
}

OrderDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Order detail'
    }

}

export default OrderDetailScreen