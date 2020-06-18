import React from 'react';
import { ScrollView, SafeAreaView, View, KeyboardAvoidingView, StyleSheet, Dimensions } from "react-native";
import { Text, Input, Button, Icon } from "react-native-elements";

// Components
import InputUi from "../../components/UI/InputUi";

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
                            <View style={styles.inputsContainer}>
                                <InputUi
                                    id='email'
                                    placeholder='E-mail'
                                    keyboardType='email-address'
                                    required
                                    email
                                    autoCapitalize='none'
                                    //errorMessage={userErr}
                                    //value={}
                                    onChangeText={val => { }}
                                    leftIcon={{ name: 'mail-outline', size: 32, color: 'darkgray' }}
                                />
                                <InputUi
                                    id='password'
                                    placeholder='Password'
                                    keyboardType='default'
                                    secureTextEntry
                                    required
                                    minLength={5}
                                    autoCapitalize='none'
                                    //errorMessage={passwordErr}
                                    //value={}
                                    onChangeText={val => { }}
                                    containerStyle={styles.inputContainer}
                                    leftIcon={{ name: 'lock-outline', size: 32, color: 'darkgray' }}
                                />
                                <Text
                                    style={{ textAlign: "right", marginTop: 10, color: Colors.inactive }}
                                    onPress={() => { }}
                                >
                                    Forget Password?
                                </Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button
                                    title='Login'
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.mainButton}
                                    onPress={() => { }}
                                //loading={loginLoading}
                                />
                                <Button
                                    title='Create Account'
                                    type="outline"
                                    raised
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.secondaryButton}
                                    titleStyle={styles.secondaryButtonTitle}
                                    onPress={() => { }}
                                />
                            </View>
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
        marginVertical: 10,
        color: Colors.grey,
        fontSize: 20
    },
    inputsContainer: {
        marginTop: 50,
        marginBottom: 40
    },
    buttonsContainer: {
    },
    buttonContainer: {
        marginVertical: 5,
        borderColor: Colors.primary
    },
    mainButton: {
        backgroundColor: Colors.primary
    },
    secondaryButton: {
        borderColor: Colors.primary,
    },
    secondaryButtonTitle: {
        color: Colors.primary
    }
})

export default AuthScreen;