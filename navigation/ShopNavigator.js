import React from 'react';
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";

// Actions
import * as authActions from '../store/actions/auth'

// Screens
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from "../screens/shop/ProductDetailScreen";
import CartScreen, { screenOptions as cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { screenOptions as ordersScreenOptions } from "../screens/shop/OrdersScreen";
import OrderDetailScreen, { screenOptions as orderDetailScreenOptions } from '../screens/shop/OrderDetailScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from "../screens/user/UserProductsScreen";
import EditProductScreen, { screenOptions as editProductsScreenOptions } from "../screens/user/EditProductScreen";
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from "../screens/StartupScreen";

// Constants
import Colors from "../constants/Colors";
import WelcomeScreen from '../screens/user/WelcomeScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen
            name="ProductsOverview"
            component={ProductsOverviewScreen}
            options={productsOverviewScreenOptions}
        />
        <ProductsStackNavigator.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={productDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen
            name="Cart"
            component={CartScreen}
            options={cartScreenOptions}
        />
    </ProductsStackNavigator.Navigator>
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Icon name="shopping-cart" color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const OrdersStackNavigatior = createStackNavigator();

export const OrdersNavigator = () => {
    return <OrdersStackNavigatior.Navigator screenOption={defaultNavOptions}>
        <OrdersStackNavigatior.Screen
            name="Orders"
            component={OrdersScreen}
            options={ordersScreenOptions}
        />
        <OrdersStackNavigatior.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={orderDetailScreenOptions}
        />
    </OrdersStackNavigatior.Navigator>
}

// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen,
//     OrderDetail: OrderDetailScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Icon name="list" color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return <AdminStackNavigator.Navigator screenOption={defaultNavOptions}>
        <AdminStackNavigator.Screen
            name="UserProducts"
            component={UserProductsScreen}
            options={userProductsScreenOptions}
        />
        <AdminStackNavigator.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={editProductsScreenOptions}
        />
    </AdminStackNavigator.Navigator>
}

// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Icon name="edit" color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return <ShopDrawerNavigator.Navigator
        drawerContent={props => {
            return <View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} />
                    <View style={{ margin: 20 }}>
                        <Button
                            title='Logout'
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout())
                                //props.navigation.navigate('Welcome')
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        }}
        drawerContentOptions={{
            activeTintColor: Colors.primary
        }}>
        <ShopDrawerNavigator.Screen
            name="Products"
            component={ProductsNavigator}
            options={{
                drawerIcon: props => <Icon name="shopping-cart" color={props.tintColor} />
            }}
        />
        <ShopDrawerNavigator.Screen
            name="Orders"
            component={OrdersNavigator}
            options={{
                drawerIcon: props => <Icon name="list" color={props.tintColor} />
            }}
        />
        <ShopDrawerNavigator.Screen
            name="Admin"
            component={AdminNavigator}
            options={{
                drawerIcon: props => <Icon name="edit" color={props.tintColor} />
            }}
        />
    </ShopDrawerNavigator.Navigator>
}

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// },
//     {
//         contentOptions: {
//             activeTintColor: Colors.primary
//         },
//         contentComponent: props => {
//             const dispatch = useDispatch()
//             return <View>
//                 <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                     <DrawerItems {...props} />
//                     <View style={{ margin: 20 }}>
//                         <Button
//                             title='Logout'
//                             color={Colors.primary}
//                             onPress={() => {
//                                 dispatch(authActions.logout())
//                                 props.navigation.navigate('Welcome')
//                             }}
//                         />
//                     </View>
//                 </SafeAreaView>
//             </View>
//         }
//     })

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen
            name="Welcome"
            component={WelcomeScreen}
        />
        <AuthStackNavigator.Screen
            name="Auth"
            component={AuthScreen}
        />
    </AuthStackNavigator.Navigator>
}

// const AuthNavigator = createStackNavigator({
//     Welcome: {
//         screen: WelcomeScreen,
//         navigationOptions: {
//             headerShown: false,
//         }
//     },
//     Auth: {
//         screen: AuthScreen,
//         navigationOptions: {
//             title: '',
//             headerTransparent: {
//                 backgroundColor: 'transparent'
//             },
//         }
//     }
// })

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// })

export default ProductsNavigator;