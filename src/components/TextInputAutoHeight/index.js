import React from "react";
import { View } from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import generalStyles from "../../styles/generalStyles";
import colors from "../../values/colors";

const TextInputAutoHeight = ({
  onChangeText,
  placeholder,
  value,
  ...props
}) => {
  return (
    <View
      style={[
        {
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 12,
          backgroundColor: "#f8f9fa",
          borderColor: colors.primary_green,
          borderWidth: 1,
        },
        generalStyles.boxShadow,
      ]}
    >
      <AutoGrowingTextInput
        style={{
          fontSize: 14,
          color: "#333",
          minHeight: 80,
          textAlignVertical: "top",
          paddingVertical:5
        }}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};

export default TextInputAutoHeight;
