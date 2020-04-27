import React from "react";
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { Card } from "react-native-elements";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <Card
                    featuredTitle={`$ ${props.price}`}
                    featuredSubtitle={props.title}
                    image={{ uri: props.imageUrl }}
                    imageStyle={styles.image}
                >
                    <View style={styles.actions}>
                        {props.children}
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
    buttonTitle: {
        paddingHorizontal: 15
    }
})

export default ProductItem;