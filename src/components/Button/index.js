import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
export default function ButtonComponent({
  text,
  style,
  textStyle,
  iconSource,
  styleIcon,
  onPress,
  rightIcon,
  leftIcon,
  badge,
  badgeStyle,
  disable,
}) {
  return (
    <TouchableOpacity style={style} disabled={disable} onPress={onPress}>
      {leftIcon && <Image source={leftIcon} style={styleIcon} />}
      {text && <Text style={textStyle}>{text}</Text>}
      {iconSource && <Image source={iconSource} style={styleIcon} />}
      {rightIcon && <Image source={rightIcon} style={styleIcon} />}
      {badge && (
        <View style={badgeStyle}>
          <Text style={{color: 'white', fontSize: 12}}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
