import React from "react";
import { View } from "react-native";
import { Text, Tile, ListItem } from "react-native-elements";

// Constants
import Colors from "../../constants/Colors";

const OrderDetailScreen = props => {
    const order = props.navigation.getParam('order');

    return (
        <>
            <Tile
                title={`${order.readableDate}\n$${order.totalAmount}`}
                featured
                icon={{ name: 'shopping-cart', size: 170, color: "white" }}
                overlayContainerStyle={{ backgroundColor: Colors.primary }}
                activeOpacity={0}
            />
            {
                order.items.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.productTitle}
                        rightTitle={`$ ${item.sum.toFixed(2)}`}
                        rightSubtitle={
                            item.quantity.toString()
                        }
                        bottomDivider
                    />
                ))
            }
        </>
    )
}

OrderDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Order detail'
    }

}

export default OrderDetailScreen