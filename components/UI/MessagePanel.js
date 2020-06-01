import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Card, Icon } from "react-native-elements";

// Constants
import Colors from "../../constants/Colors";

/** 
 * Full width error or success msg
 * @param {string} type
 * @param {string} text
 */

const MessagePanel = props => {
    return (
        <Card containerStyle={props.type === 'success' ? styles.panelSuccess : styles.panelError}>
            <View style={styles.container}>
                <Icon
                    containerStyle={styles.icon}
                    name={props.type === 'success' ? 'check' : 'error'}
                    color='white' />
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    panelSuccess: {
        margin: 0,
        backgroundColor: Colors.success
    },
    panelError: {
        margin: 0,
        backgroundColor: Colors.error
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        paddingRight: 10
    },
    text: {
        color: 'white'
    }
})

export default MessagePanel
