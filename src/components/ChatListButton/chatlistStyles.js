// chatlistStyles.js
import { StyleSheet } from 'react-native';
import colors from '../../values/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  leftIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: colors.greyLight, // Bổ sung màu nền để hình ảnh đại diện nổi bật hơn
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary_blue,
    marginBottom: 2,
  },
  content: {
    fontSize: 14,
    color: colors.darkGrey,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.greyLight,
  },
  contentUnread: {
    fontWeight: '500',
    color: colors.black, // In đậm cho tin nhắn chưa xem
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: colors.grey,
  },
  timeUnread: {
    color: colors.black, // Màu đen cho thời gian của tin nhắn chưa xem
    fontWeight: '500', // In đậm cho thời gian của tin nhắn chưa xem
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default styles;
