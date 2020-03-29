import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderButton } from "react-navigation-header-buttons";

// Constants
import Colors from "../../constants/Colors";


const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Icon}
            color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
    )
};

export default CustomHeaderButton;
