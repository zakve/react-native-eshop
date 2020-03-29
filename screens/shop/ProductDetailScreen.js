import React from 'react';
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Text, Button } from "react-native-elements";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

// Constants
import Colors from "../../constants/Colors";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch();

    return (
        <ScrollView
            contentContainerStyle={styles.scrollview}>
            <View>
                <Image
                    source={{ uri: selectedProduct.imageUrl }}
                    style={styles.image}
                />
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomPrice}>
                    <Text>Total{"\n"}amount</Text>
                    <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        title='Add to Cart'
                        onPress={() => {
                            dispatch(cartActions.addToCart(selectedProduct))
                        }}
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: 300
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15
    },
    price: {
        fontSize: 30,
        fontWeight: "bold"
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        margin: 20
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#aaa',
        backgroundColor: "#ffffff"
    },
    bottomPrice: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 20
    },
    bottomButton: {
        flex: 1
    }
});

export default ProductDetailScreen;