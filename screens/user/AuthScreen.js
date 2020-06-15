import React from 'react';
import { ScrollView, SafeAreaView, View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text, Input, Button, Image } from "react-native-elements";

// Constants
import Colors from '../../constants/Colors';

const AuthScreen = props => {
    return (
        <ScrollView style={styles.screen}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                </View>
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={20}
                >
                    <>
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
                    </>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {

    }
})

export default AuthScreen;