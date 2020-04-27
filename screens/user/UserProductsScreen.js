import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";

// Components
import ProductItem from "../../components/shop/ProductItem";

// Constants
import Colors from "../../constants/Colors";

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

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
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item)),
                                Snackbar.show({
                                    text: 'Item added to Cart',
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                        }}
                    >
                        <Button
                            title='Delete'
                            type="clear"
                            titleStyle={styles.buttonTitle}
                            onPress={() => {
                            }}
                        />
                        <Button
                            title='Edit '
                            buttonStyle={styles.button}
                            icon={
                                <Icon
                                    name="edit"
                                    size={20}
                                    color="white"
                                />}
                            iconRight={true}
                            onPress={() => { }}
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