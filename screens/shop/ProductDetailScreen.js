import React from 'react';
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Text, Button } from "react-native-elements";

// Redux
import { useSelector } from "react-redux";

// Constants
import Colors from "../../constants/Colors";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <ScrollView>
            <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.image}
            />
            <Button
                title='Add to Cart'
                onPress={() => { }}
                buttonStyle={styles.button}
            />
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    button: {
        backgroundColor: Colors.primary
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: "center",
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;