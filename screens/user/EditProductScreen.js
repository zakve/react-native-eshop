import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Input } from "react-native-elements";
import { CustomHeaderButton, Item } from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        console.log('submit')
    }, [])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView style={styles.background}>
            <View style={styles.screen}>
                <Input
                    label='Title'
                    value={title}
                    onChange={text => setTitle(text)}
                    containerStyle={styles.inputContainer}
                    errorMessage=''
                />
                <Input
                    label='Image URL'
                    value={imageUrl}
                    onChange={text => setImageUrl(text)}
                    containerStyle={styles.inputContainer}
                    errorMessage=''
                />
                {
                    !editedProduct &&
                    <Input
                        label='Price'
                        value={price}
                        onChange={text => setPrice(text)}
                        containerStyle={styles.inputContainer}
                        errorMessage=''
                    />
                }

                <Input
                    label='Description'
                    value={description}
                    onChange={text => setDescription(text)}
                    containerStyle={styles.inputContainer}
                    errorMessage=''
                />
            </View>
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