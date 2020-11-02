import React from "react";
import { FlatList, StyleSheet, Alert, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
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

    const deleteHandler = (itemId) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'yes', style: 'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(itemId))
                }
            }
        ])
    }

    if (userProducts.length === 0) {
        return <View style={styles.emptyContainer}>
            <Text h4 style={styles.emptyText}>No products</Text>
            <Icon
                name="landscape"
                size={70}
                color="grey"
            />
        </View>
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
                            onPress={deleteHandler.bind(this, itemData.item.id)}
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

export const screenOptions = navData => {
    return {
        headerTitle: "Admin",
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
    },
    emptyContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        color: "grey",
        marginBottom: 20
    }
});

export default UserProductsScreen;