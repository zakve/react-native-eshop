import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Card, Icon, Input } from "react-native-elements";

// Constants
import Colors from "../../constants/Colors";

/** 
 * Full width error or success msg
 * @param {string} type
 * @param {string} text
 */

const MessagePanel = props => {
    return (
        <Input
            {...props}
            id={props.id}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            autoCapitalize='none'
            value={props.value}
            onChangeText={val => { props.onChangeText(val) }}
            leftIcon={props.leftIcon}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={styles.leftIconContainerStyle}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 5
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    leftIconContainerStyle: {
        marginRight: 20
    }
})

export default MessagePanel
