import React from 'react';
import { StyleSheet, View, ScrollView, Image, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-elements";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

// Components
import PriceSummary from "../../components/shop/PriceSummary";

// Constants
import Colors from "../../constants/Colors";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch();

    const addCartHandler = param => {
        dispatch(cartActions.addToCart(selectedProduct))
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollview}>
            <SafeAreaView>
                <Image
                    source={{ uri: selectedProduct.imageUrl }}
                    style={styles.image}
                />
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.bottom}>
                <PriceSummary
                    buttonTitle="Add to Cart"
                    price={selectedProduct.price}
                    orderHandler={addCartHandler()} />
            </SafeAreaView>
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
    description: {
        fontSize: 14,
        textAlign: "center",
        margin: 20
    },
    bottom: {
        backgroundColor: 'white'
    }
});

export default ProductDetailScreen;