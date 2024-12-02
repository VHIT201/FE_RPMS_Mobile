import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./buildingButtonStyles";
import { Icons } from "../../assets/icons";

const BuildingButton = ({ imageSource, title, address, onPress, containerStyle, iconStyle, titleStyle, addressStyle }) => {
    return (
        <TouchableOpacity 
            style={[styles.container, containerStyle]} 
            onPress={onPress}
        >
            <View style={imageSource ? styles.imageContainer : [styles.iconContainer, iconStyle]}>
                <Image 
                    style={imageSource ? [styles.icon, { height: 80, width: 80 }] : [styles.icon, iconStyle]} 
                    resizeMode="cover"
                    source={imageSource ? { uri: imageSource } : Icons.iconHome} 
                />
            </View>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <Text style={[styles.address, addressStyle]}>{address}</Text>
        </TouchableOpacity>
    );
}

export default BuildingButton;
