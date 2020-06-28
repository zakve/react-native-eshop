import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from "react-redux";

// Actions
import * as authActions from "../store/actions/auth";

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData')
                if (!userData) {
                    props.navigation.navigate('Auth');
                    return;
                }
                const transformedData = JSON.parse(userData);
                const { token, userId, expiryDate } = transformedData;
                const expirationDate = new Date(expiryDate);

                if (expirationDate <= new Date() || !token || !userId) {
                    props.navigation.navigate('Auth');
                    return;
                }

                props.navigation.navigate('Shop');
                dispatch(authActions.authenticate(userId, token));
            } catch (e) {
                console.log(e)
            }
        }

        tryLogin();
    }, [dispatch])
    return <View style={styles.centered}>
        <ActivityIndicator size='large' />
    </View>
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StartupScreen;