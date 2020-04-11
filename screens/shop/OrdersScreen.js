import React from "react";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return
    orders.map((l, i) => (
        <ListItem
            key={i}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
        />
    ))
}

export default OrderScreen