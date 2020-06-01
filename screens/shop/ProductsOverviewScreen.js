import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, Platform, View, ActivityIndicator } from "react-native";
import { Badge, Icon, Button } from "react-native-elements";
import Snackbar from 'react-native-snackbar';

// Redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart'
import * as productsActions from "../../store/actions/products";

// Components
import ProductItem from "../../components/shop/ProductItem";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";

// Constants
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setParams({
            itemsCount: Object.keys(cart).length
        })
    }, [cart])

    useEffect(() => {
        const loadProducts = (async () => {
            setIsLoading(true)
            await dispatch(productsActions.fetchProducts())
            setIsLoading(false)
        })()
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Icon
                name='landscape'
                size={70}
            />
            <Text>No products found. Maybe start adding some!</Text>
        </View>
    }

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
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button
                            title='View Detail'
                            type="clear"
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title)
                            }}
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
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item)),
                                    Snackbar.show({
                                        text: 'Item added to Cart',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                            }}
                        />
                    </ProductItem>
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    const itemsCount = navData.navigation.getParam('itemsCount');

    return {
        headerTitle: 'All products',
        headerLeft: () => (
            <CustomHeaderButton>
                <Item
                    title="Menu"
                    iconName="menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </CustomHeaderButton>
        ),
        headerRight: () => (
            <CustomHeaderButton>
                <Item
                    title="Cart"
                    iconName="shopping-cart"
                    ButtonElement={
                        <View style={{ right: 10 }}>
                            <Icon
                                name='shopping-cart'
                                size={23}
                                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                            />
                            {
                                itemsCount > 0 &&
                                <Badge
                                    status="primary"
                                    value={itemsCount}
                                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                />
                            }
                        </View>
                    }
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </CustomHeaderButton>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: Colors.primary
    },
});

export default ProductsOverviewScreen;