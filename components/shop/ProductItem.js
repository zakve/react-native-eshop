import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductItem = props => {
    console.log(props.image)
    return (
        <Card
            featuredTitle={`$ ${props.price}`}
            featuredSubtitle={props.title}
            image={{ uri: props.imageUrl }}
            imageStyle={styles.image}
        >
            <View style={styles.actions}>
                <Button
                    title='Detail'
                    type="outline"
                    onPress={props.onViewDetail}
                />
                <Button
                    title='Buy  '
                    icon={
                        <Icon
                            name="shopping-cart"
                            size={20}
                            color="white"
                        />}
                    iconRight={true}
                    iconContainerStyle={styles.btnIcon}
                    onPress={props.onAddToCart}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    }
})

export default ProductItem;