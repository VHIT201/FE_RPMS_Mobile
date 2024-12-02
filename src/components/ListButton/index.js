import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

export default function ListButtonComponents({
  itemTitle,
  itemSubtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
  iconSource,
  iconStyle,
  onPress,
  rightIcon,
  leftIcon,
  timestamp,
  timestampStyle,
  isDisabled,
  textContainerStyles,
  leftIconStyle,
  styleRightIcon,
  timestampTextStyle,
}) {
  const isUri = (source) => typeof source === 'string' && (source.startsWith('http') || source.startsWith('https'));
  return (
    <TouchableOpacity style={containerStyle} disabled={isDisabled} onPress={onPress}>
      {/* {leftIcon && <Image source={leftIcon} style={iconStyle} />} */}
      {leftIcon && <Image resizeMode='cover' source={isUri(leftIcon) ? { uri: leftIcon } : leftIcon} style={leftIconStyle} />}
      <View style={textContainerStyles}>
        {itemTitle && <Text style={titleStyle}>{itemTitle}</Text>}
        {itemSubtitle && <Text numberOfLines={1} style={subtitleStyle}>{itemSubtitle}</Text>}
      </View>
      {iconSource && <Image source={iconSource} style={iconStyle} />}
      {rightIcon && <Image resizeMode='cover' source={isUri(rightIcon) ? { uri: rightIcon } : rightIcon} style={styleRightIcon} />}
      {timestamp && (
        <View style={timestampStyle}>
          <Text style={timestampTextStyle}>{timestamp}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});