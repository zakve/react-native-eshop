import React from 'react';
import { ScrollView, SafeAreaView, View, KeyboardAvoidingView, StyleSheet, Dimensions } from "react-native";
import { Text, Input, Button, Image } from "react-native-elements";

// Constants
import Colors from '../../constants/Colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AuthScreen = props => {
    return (
        <View style={styles.bg}>
            <ScrollView>
                <SafeAreaView>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={20}
                    >
                        <View style={styles.screen}>
                            <Text style={styles.title}>Login</Text>
                            <Text style={styles.subtitle}>Enter your email and password to get access to your account.</Text>
                            <Input
                                id='email'
                                label='Paymail'
                                keyboardType='email-address'
                                required
                                email
                                autoCapitalize='none'
                                //errorMessage={userErr}
                                //value={}
                                onChangeText={val => { }}
                            />
                            <Input
                                id='password'
                                label='Password'
                                keyboardType='default'
                                secureTextEntry
                                required
                                minLength={5}
                                autoCapitalize='none'
                                //errorMessage={passwordErr}
                                //value={}
                                onChangeText={val => { }}
                                containerStyle={styles.inputContainer}
                            />
                            <Button
                                title='Login'
                                containerStyle={styles.button}
                                onPress={() => { }}
                            //loading={loginLoading}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    screen: {
        paddingVertical: windowHeight / 10,
        paddingHorizontal: windowWidth / 20
    },
    title: {
        color: Colors.primary,
        fontWeight: "bold",
        fontSize: 30,
    },
    subtitle: {
        margin: 10,
        color: Colors.grey,
        fontSize: 20
    },
})

export default AuthScreen;