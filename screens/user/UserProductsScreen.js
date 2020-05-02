import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";

// Components
import ProductItem from "../../components/shop/ProductItem";

// Constants
import Colors from "../../constants/Colors";

const UserProductsScreen = props => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData =>
                    <ProductItem
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    >
                        <Button
                            title='Delete'
                            type="clear"
                            titleStyle={styles.buttonTitle}
                            onPress={() => {
                                dispatch(productsActions.deleteProduct(itemData.item.id))
                            }}
                        />
                        <Button
                            title='Edit '
                            type="clear"
                            iconRight={true}
                            onPress={() => {
                                editProductHandler(itemData.item.id)
                            }}
                        />
                    </ProductItem>
            }
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Admin products",
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
                    title="Add"
                    iconName="add"
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }}
                />
            </CustomHeaderButton>
        ),
    }
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        backgroundColor: Colors.primary
    },
    buttonTitle: {
        color: "red"
    }
});

export default UserProductsScreen;