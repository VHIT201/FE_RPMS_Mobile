import React from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../../features/home/homeStyles';
import colors from '../../values/colors';

const InfoSection = ({ data, style, numColumns, styleValue, styleLabel }) => {
  // Tạo mảng con dựa trên số hàng truyền vào
  const displayedData = data.slice(0, numColumns);

  return (
    <View style={[homeStyles.container, style]}>
      {displayedData.map((column, columnIndex) => (
        <View key={columnIndex} style={homeStyles.columnContainer}>
          {column.map((item, itemIndex) => (
            <View key={itemIndex} style={homeStyles.centeredTextContainer}>
              <Text style={[{ fontWeight: "600", color: colors.primary_green }, styleLabel]}>
                {item.label}
              </Text>
              <Text style={styleValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default InfoSection;
