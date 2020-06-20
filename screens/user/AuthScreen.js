import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, KeyboardAvoidingView, StyleSheet, Dimensions } from "react-native";
import { Text, Input, Button, Icon } from "react-native-elements";
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup';

// Actions
import * as authActions from "../../store/actions/auth";

// Components
import InputUi from "../../components/UI/InputUi";

// Constants
import Colors from '../../constants/Colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AuthScreen = props => {
    const dispatch = useDispatch();

    const [isSignup, setIsSignup] = useState(props.navigation.getParam('isSignup'));

    const [blurLogin, setBlurLogin] = useState(false);
    const [blurPassword, setBlurPassword] = useState(false);
    const [blurPasswordConfirmation, setBlurPasswordConfirmation] = useState(false);

    const submitHandler = (values) => {
        if (isSignup) {
            dispatch(authActions.signup(values.email, values.password))
        } else {
            dispatch(authActions.login(values.email, values.password))
        }
    }

    return (
        <View style={styles.bg}>
            <ScrollView>
                <SafeAreaView>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={20}
                    >
                        <View style={styles.screen}>
                            <Text style={styles.title}>{isSignup ? "Create Account" : "Login"}</Text>
                            <Text style={styles.subtitle}>
                                {isSignup ? "Start your awesome shopping yourney with us!" : "Enter your email and password to get access to your account."}

                            </Text>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    passwordConfirmation: '',
                                }}
                                onSubmit={values => submitHandler(values)}
                                validationSchema={yup.object().shape({
                                    email: yup
                                        .string()
                                        .required()
                                        .email(),
                                    password: yup
                                        .string()
                                        .required()
                                        .min(6),
                                    passwordConfirmation: yup
                                        .string()
                                        .oneOf([yup.ref('password'), null], 'Passwords must match')
                                })}
                            >
                                {({ values, handleChange, errors, handleBlur, setFieldTouched, touched, handleSubmit }) => (
                                    <>
                                        <View style={styles.inputsContainer}>
                                            <InputUi
                                                id='email'
                                                placeholder='E-mail'
                                                keyboardType='email-address'
                                                required
                                                email
                                                autoFocus
                                                autoCapitalize='none'
                                                onChangeText={handleChange('email')}
                                                onBlur={() => setBlurLogin(!blurLogin)}
                                                onFocus={() => setBlurLogin(!blurLogin)}
                                                blur={blurLogin}
                                                value={values.email}
                                                errorMessage={(touched.email && errors.email) ? errors.email : ''}
                                                leftIcon={{ name: 'mail-outline', size: 32, color: 'darkgray' }}
                                            />
                                            <InputUi
                                                id='password'
                                                placeholder='Password'
                                                keyboardType='default'
                                                secureTextEntry
                                                autoCapitalize='none'
                                                onChangeText={handleChange('password')}
                                                onBlur={() => setBlurPassword(!blurPassword)}
                                                onFocus={() => setBlurPassword(!blurPassword)}
                                                blur={blurPassword}
                                                value={values.password}
                                                errorMessage={(touched.password && errors.password) ? errors.password : ''}
                                                containerStyle={styles.inputContainer}
                                                leftIcon={{ name: 'lock-outline', size: 32, color: 'darkgray' }}
                                            />
                                            {
                                                isSignup &&
                                                <InputUi
                                                    id='passwordConfirmation'
                                                    placeholder='Password again'
                                                    keyboardType='default'
                                                    secureTextEntry
                                                    autoCapitalize='none'
                                                    onChangeText={handleChange('passwordConfirmation')}
                                                    onBlur={() => setBlurPasswordConfirmation(!blurPasswordConfirmation)}
                                                    onFocus={() => setBlurPasswordConfirmation(!blurPasswordConfirmation)}
                                                    blur={blurPasswordConfirmation}
                                                    value={values.passwordConfirmation}
                                                    errorMessage={(touched.passwordConfirmation && errors.passwordConfirmation) ? errors.passwordConfirmation : ''}
                                                    containerStyle={styles.inputContainer}
                                                    leftIcon={{ name: 'lock-outline', size: 32, color: 'darkgray' }}
                                                />
                                            }
                                            {
                                                !isSignup &&
                                                <Text
                                                    style={{ textAlign: "right", marginTop: 10, color: Colors.inactive }}
                                                    onPress={() => { }}
                                                >
                                                    Forget Password?
                                            </Text>
                                            }
                                        </View>
                                        <View style={styles.buttonsContainer}>
                                            <Button
                                                title={isSignup ? 'Create Account' : 'Login'}
                                                containerStyle={styles.buttonContainer}
                                                buttonStyle={styles.mainButton}
                                                onPress={handleSubmit}
                                            //loading={loginLoading}
                                            />
                                            <Button
                                                title={isSignup ? 'Go to Login' : 'Create Account'}
                                                type="outline"
                                                raised
                                                containerStyle={styles.buttonContainer}
                                                buttonStyle={styles.secondaryButton}
                                                titleStyle={styles.secondaryButtonTitle}
                                                onPress={() => setIsSignup(!isSignup)}
                                            />
                                        </View>
                                    </>
                                )}
                            </Formik>
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