import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from "react-native";
import { Input } from "react-native-elements";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { Formik, useFormikContext } from 'formik'
import * as yup from 'yup';

// Constants
import Colors from "../../constants/Colors";

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const formRef = useRef();

    const prodId = props.route.params ? props.route.params.productId : null;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <CustomHeaderButton>
                    <Item
                        title="Accept"
                        iconName="check"
                        onPress={() => formRef.current.submitForm()}
                    />
                </CustomHeaderButton>
            ),
        });
    }, [submitHandler]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const submitHandler = async (values) => {
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(prodId, values.title, values.description, values.imageUrl))
            } else {
                await dispatch(productsActions.createProduct(values.title, values.description, values.imageUrl, values.price))
            }
            props.navigation.goBack();
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView style={styles.background}>
                <Formik
                    initialValues={{
                        title: editedProduct ? editedProduct.title : '',
                        imageUrl: editedProduct ? editedProduct.imageUrl : '',
                        price: editedProduct ? editedProduct.price : '',
                        description: editedProduct ? editedProduct.description : ''
                    }}
                    innerRef={formRef}
                    onSubmit={values => submitHandler(values)}
                    validationSchema={yup.object().shape({
                        title: yup
                            .string()
                            .required('Please, provide title!'),
                        imageUrl: yup
                            .string()
                            .required()
                            .url(),
                        price: yup
                            .number()
                            .required()
                            .moreThan(0),
                        description: yup
                            .string()
                            .required(),
                    })}
                >
                    {({ values, handleChange, errors, handleBlur, setFieldTouched, touched, handleSubmit }) => {

                        return (
                            <View style={styles.screen}>
                                <Input
                                    label='Title'
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    containerStyle={styles.inputContainer}
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    autoCorrect
                                    errorMessage={(touched.title && errors.title) ? errors.title : ''}
                                />
                                <Input
                                    label='Image URL'
                                    value={values.imageUrl}
                                    onChangeText={handleChange('imageUrl')}
                                    onBlur={handleBlur('imageUrl')}
                                    containerStyle={styles.inputContainer}
                                    errorMessage={(touched.imageUrl && errors.imageUrl) ? errors.imageUrl : ''}
                                />
                                {
                                    !editedProduct &&
                                    <Input
                                        label='Price'
                                        value={values.price}
                                        onChangeText={handleChange('price')}
                                        onBlur={handleBlur('price')}
                                        containerStyle={styles.inputContainer}
                                        keyboardType='decimal-pad'
                                        errorMessage={(touched.price && errors.price) ? errors.price : ''}
                                    />
                                }

                                <Input
                                    label='Description'
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    containerStyle={styles.inputContainer}
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    errorMessage={(touched.description && errors.description) ? errors.description : ''}
                                />
                            </View>
                        )
                    }}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};

    return {
        headerTitle: routeParams.productId ? 'Edit product' : 'Add product',
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white'
    },
    screen: {
        paddingVertical: 20
    },
    inputContainer: {
        paddingBottom: 15
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default EditProductScreen;