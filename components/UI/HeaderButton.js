import React from "react";
import { Platform } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

// Constants
import Colors from "../../constants/Colors";

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => (
    <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color={Platform.OS === 'android' ? 'white' : Colors.primary} />
);

export const CustomHeaderButton = props => {
    return (
        <HeaderButtons
            HeaderButtonComponent={MaterialHeaderButton}
            {...props}
        />
    );
};

export { Item } from 'react-navigation-header-buttons';
