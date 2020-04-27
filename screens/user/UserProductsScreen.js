import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <Text>Admin view</Text>
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

export default UserProductsScreen;