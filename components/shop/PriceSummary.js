import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";

// Constants
import Colors from "../../constants/Colors";

const PriceSummary = props => {
    return (
        <View style={styles.bottom}>
            <View style={styles.bottomPrice}>
                <Text>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.bottomButton}>
                <Button
                    title={props.buttonTitle}
                    onPress={() => {
                        props.orderHandler()
                    }}
                    disabled={props.price === 0}
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'android' ? 20 : 0,
        borderTopWidth: 1,
        borderColor: '#aaa',
        backgroundColor: "#ffffff"
    },
    bottomPrice: {
        flex: 1,
        //flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingRight: 20
    },
    bottomButton: {
        flex: 1
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15
    },
    price: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.primary
    },
})

export default PriceSummary;
