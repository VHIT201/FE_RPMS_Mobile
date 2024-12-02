// ChatListComponents.js
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './chatlistStyles';

const ChatListComponents = ({
  name,
  content,
  style,
  nameStyle,
  contentStyle,
  iconSource,
  styleIcon,
  onPress,
  rightIcon,
  leftIcon,
  time,
  timeStyle,
  timeTextStyle,
  disable,
  textContainerStyles,
  styleLeftIcon,
  isRead // Thêm thuộc tính isRead
}) => {
  const isUri = (source) => typeof source === 'string' && (source.startsWith('http') || source.startsWith('https'));

  return (
    <TouchableOpacity style={style} disabled={disable} onPress={onPress}>
      {leftIcon && <Image resizeMode='cover' source={isUri(leftIcon) ? { uri: leftIcon } : leftIcon} style={styleLeftIcon} />}
      <View style={textContainerStyles}>
        {name && <Text style={nameStyle}>{name}</Text>}
        {content && (
          <Text numberOfLines={1} style={[contentStyle, isRead ? {} : styles.contentUnread]}>
            {content}
          </Text>
        )}
      </View>
      {iconSource && <Image source={iconSource} style={styleIcon} />}
      {rightIcon && <Image resizeMode='cover' source={isUri(rightIcon) ? { uri: rightIcon } : rightIcon} style={styles.rightIcon} />}
      {time && (
        <View style={timeStyle}>
          <Text style={[timeTextStyle, isRead ? {} : styles.timeUnread]}>{time}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChatListComponents;
