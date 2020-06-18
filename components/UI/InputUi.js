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
            leftIcon={{ name: props.leftIcon.name, color: props.blur ? Colors.primary : Colors.inactive }}
            containerStyle={[styles.container, props.blur && styles.containerBlur]}
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
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: Colors.inactive
    },
    containerBlur: {
        borderColor: Colors.primary
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    leftIconContainerStyle: {
        marginRight: 20
    }
})

export default MessagePanel
