import React from "react";
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

// Contstants
import Colors from "../../constants/Colors";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <TouchableCmp onPress={props.onViewDetail} useForeground>
                <Card
                    featuredTitle={`$ ${props.price}`}
                    featuredSubtitle={props.title}
                    image={{ uri: props.imageUrl }}
                    imageStyle={styles.image}
                >
                    <View style={styles.actions}>
                        <Button
                            title='View Detail'
                            type="clear"
                            onPress={props.onViewDetail}
                        />
                        <Button
                            title='To Cart'
                            icon={
                                <Icon
                                    name="shopping-cart"
                                    size={20}
                                    color="white"
                                />}
                            iconRight={true}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            onPress={props.onAddToCart}
                        />
                    </View>
                </Card>
            </TouchableCmp>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: Colors.primary
    },
    buttonTitle: {
        paddingHorizontal: 15
    }
})

export default ProductItem;