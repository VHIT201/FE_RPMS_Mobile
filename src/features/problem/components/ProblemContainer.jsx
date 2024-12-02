import React, { memo } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';

const ProblemComponent = memo(({ roomName, status, issue, description, userName, date, colors, generalStyles, onDelete }) => {
  const borderColors = {
    0: 'orange', // Pending
    1: 'blue',   // In Progress
    2: 'green',  // Completed
    3: 'red',    // Canceled
  };

  const statusColors = {
    0: 'orange', // Pending
    1: 'blue',   // In Progress
    2: 'green',  // Completed
    3: 'red',    // Canceled
  };

  const statusLabels = {
    0: 'Đang yêu cầu',
    1: 'Đang xử lý',
    2: 'Hoàn thành',
    3: 'Đã hủy',
  };

  const vibrantTextColor = 'gray';

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [0, 120],
    });

    return (
      <Animated.View style={[styles.rightAction, { transform: [{ translateX: trans }] }]}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.actionText}>Hủy</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // If status is 1 (In Progress) or 2 (Completed), disable swipe
  const swipeEnabled = !(status === 1 || status === 2);

  const content = (
    <View style={[generalStyles.boxShadow, {
      paddingVertical: '5%',
      paddingHorizontal: '5%',
      borderRadius: 12,
      backgroundColor: colors.white,
      borderColor: borderColors[status] || 'gray',
      borderWidth: 1,
      overflow: 'hidden',
    }]}
    >
      {/* Header with room name and status */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8, flex: 1 }}>
          <Icon name="home" size={20} color={vibrantTextColor} style={{ minWidth: 24, textAlign: 'center' }} />
          <Text style={{ fontWeight: '700', fontSize: 16, color: vibrantTextColor, textAlignVertical: 'center', flexShrink: 1 }}>{roomName}</Text>
        </View>
        <View style={{
          paddingVertical: 2,
          paddingHorizontal: 8,
          backgroundColor: statusColors[status] || 'gray',
          borderRadius: 16,
          alignSelf: 'flex-start'
        }}>
          <Text style={{ color: colors.white, fontWeight: '600', fontSize: 12, textAlignVertical: 'center' }}>{statusLabels[status] || 'Unknown'}</Text>
        </View>
      </View>

      {/* Issue section */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: '2%' }}>
        <Icon name="exclamation-triangle" size={18} color={vibrantTextColor} style={{ minWidth: 24, textAlign: 'center', marginRight: 8 }} />
        <Text style={{ fontWeight: '600', fontSize: 14, color: vibrantTextColor, flexShrink: 1, flexWrap: 'wrap' }}>{issue}</Text>
      </View>

      {/* Description section */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: '2%' }}>
        <Icon name="info-circle" size={18} color={vibrantTextColor} style={{ minWidth: 24, textAlign: 'center', marginRight: 8 }} />
        <Text style={{ fontSize: 14, color: vibrantTextColor, flexShrink: 1, flexWrap: 'wrap' }}>{description}</Text>
      </View>

      {/* Footer with user and date */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Icon name="user" size={18} color={vibrantTextColor} style={{ minWidth: 24, textAlign: 'center', marginRight: 8 }} />
          <Text style={{ fontWeight: '600', fontSize: 13, color: vibrantTextColor, flexShrink: 1 }}>{userName}</Text>
        </View>
        <Text style={{ fontSize: 13, color: vibrantTextColor, fontWeight: '600' }}>{date}</Text>
      </View>
    </View>
  );

  return swipeEnabled ? (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={25}
      onSwipeableRightOpen={onDelete}
    >
      {content}
    </Swipeable>
  ) : content;
});

const styles = {
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    borderRadius: 20,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
};

export default ProblemComponent;
