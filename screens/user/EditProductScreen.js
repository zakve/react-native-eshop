import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { Formik } from 'formik'
import * as yup from 'yup';

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const submitHandler = (values) => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, values.title, values.description, values.imageUrl))
        } else {
            dispatch(productsActions.createProduct(values.title, values.description, values.imageUrl, values.price))
        }
        props.navigation.goBack();
    }

    return (
        <ScrollView style={styles.background}>
            <Formik
                initialValues={{
                    title: editedProduct ? editedProduct.title : '',
                    imageUrl: editedProduct ? editedProduct.imageUrl : '',
                    price: '',
                    description: editedProduct ? editedProduct.description : ''
                }}
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
                    useEffect(() => {
                        props.navigation.setParams({ submit: handleSubmit })
                    }, [handleSubmit])

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
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit product' : 'Add product',
        headerRight: () => (
            <CustomHeaderButton>
                <Item
                    title="Accept"
                    iconName="check"
                    onPress={submitFn}
                />
            </CustomHeaderButton>
        ),
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
    }
})

export default EditProductScreen;