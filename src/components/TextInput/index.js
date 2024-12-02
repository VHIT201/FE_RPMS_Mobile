import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

const TextInputComponent = ({
  placeholder,
  style,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  onChangeText,
  onBlur,
  value,
  errors,
  rightIcon,
  onPressRightIcon,
  leftIcon,
  onPressLeftIcon,
  styleAreaInput,
  secureTextEntry,
  label,
  require,
  styleLabel,
  maxLength,
  onFocus,
  disable,
  noBorder,
  autoCompleteType,
  borderColor,
  type,
  multiline,
  numberOfLines,
  onContentSizeChange,
  borderRadius,
  showPassword = false, // Thêm prop showPassword, mặc định là false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Trạng thái để ẩn/hiện mật khẩu

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View style={stylesTextInput.container}>
      {label && (
        <View style={stylesTextInput.containerLabel}>
          <Text
            children={`${label}`}
            style={[stylesTextInput.textLabel, styleLabel]}
          />
          {require && <Text children={' *'} style={{ color: colors.red }} />}
        </View>
      )}
      <View
        style={[
          noBorder
            ? stylesTextInput.containerAreaInputNoBorder
            : [
                stylesTextInput.containerAreaInput,
                { borderRadius: borderRadius },
              ],
          styleAreaInput,
          { borderColor: isFocused ? colors.primary_green : borderColor },
        ]}>
        {leftIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressLeftIcon && onPressLeftIcon();
            }}
            style={stylesTextInput.leftIcon}>
            <Image source={leftIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}
        <TextInput
          style={[stylesTextInput.textInput, { fontFamily: fontFamily.regular }, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? colors.grayC4}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
          value={value}
          secureTextEntry={showPassword ? !isPasswordVisible : secureTextEntry} // Nếu showPassword là true, toggle secureTextEntry
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          editable={!disable}
          autoComplete={autoCompleteType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onContentSizeChange={onContentSizeChange}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressRightIcon && onPressRightIcon();
            }}>
            <Image source={rightIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}

        {/* Nếu showPassword là true, hiển thị nút để ẩn/hiện mật khẩu */}
        {showPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={stylesTextInput.rightIcon}>
            {isPasswordVisible ? (
              <Icon name="eye-slash" size={20} color={colors.primary_green} /> // Biểu tượng mắt bị gạch chéo khi mật khẩu bị ẩn
            ) : (
              <Icon name="eye" size={20} color={colors.primary_green} /> // Biểu tượng mắt khi mật khẩu hiển thị
            )}
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <HelperText type="error" visible={Boolean(errors)}>
          {'Vui lòng nhập đầy đủ !!!'}
        </HelperText>
      )}
    </View>
  );
};

const stylesTextInput = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerAreaInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
    borderColor: colors.black1,
    borderWidth: 1,
  },
  containerAreaInputNoBorder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    color: colors.black,
    height: 40,
  },
  textLabel: {
    color: colors.black1,
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  leftIcon: {
    height: 50,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default TextInputComponent;
