import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

// Redux
import { useSelector } from "react-redux";

// Components
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={
                itemData =>
                    <ProductItem
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onViewDetail={() => { }}
                        onAddToCart={() => { }}
                    />
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All products'
}

const styles = StyleSheet.create({

});

export default ProductsOverviewScreen;