import React from 'react';
import { ScrollView, SafeAreaView, View, KeyboardAvoidingView, StyleSheet, Dimensions } from "react-native";
import { Text, Input, Button, Image } from "react-native-elements";
//import { LocalNotification } from '../../services/LocalPushController'

// Constants
import Colors from '../../constants/Colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomeScreen = props => {
    return (
        <View style={styles.bg}>
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.screen}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/img/delivery.png')}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.title}>Welcome to e-shop</Text>
                        <Text style={styles.subtitle}>Cool place where you can buy your favorite items.</Text>

                        <View style={styles.buttonsContainer}>
                            {/* <Button
                                title='NOTIF'
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.mainButton}
                                onPress={() => { LocalNotification() }}
                            /> */}
                            <Button
                                title='Login now'
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.mainButton}
                                onPress={() => { props.navigation.navigate('Auth') }}
                            />
                            <Button
                                title='Create Account'
                                type="outline"
                                raised
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.secondaryButton}
                                titleStyle={styles.secondaryButtonTitle}
                                onPress={() => { props.navigation.navigate('Auth', { isSignup: true }) }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    screen: {
        alignItems: "center",
        justifyContent: "center",
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
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        width: windowWidth / 2,
        height: windowWidth / 2,
        marginBottom: 50
    },
    buttonsContainer: {
        width: '70%',
        marginVertical: 40
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

export default WelcomeScreen;