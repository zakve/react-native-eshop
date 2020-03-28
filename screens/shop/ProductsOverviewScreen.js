import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart'

// Components
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

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
                        onViewDetail={() => {
                            props.navigation.navigate('ProductDetail', {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            })
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
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