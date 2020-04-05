import React from "react";
import { FlatList, StyleSheet, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart'

// Components
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";

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

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName="shopping-cart"
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});

export default ProductsOverviewScreen;