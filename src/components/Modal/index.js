import React, { useCallback } from 'react';
import { View, Modal, Pressable, Text, ScrollView, Image } from 'react-native';
import modalStyles from './modalStyles';

const CustomModal = ({ 
  visible, 
  onClose, 
  titleHeader, 
  modalBackgroundStyle, 
  modalContainerStyle, 
  children,
  headerStyles,
  leftIconHeader,
  styleIconHeader,
  rightIconHeader,
  onLeftIconHeaderPress, 
  onRightIconHeaderPress,
  footer, 
  footerStyle,
  fullScreen
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      {/* <Pressable style={[modalStyles.modalBackground, modalBackgroundStyle]} onPress={handleClose}> */}
      <Pressable style={[modalStyles.modalBackground, modalBackgroundStyle]} >
        <View 
          style={[
            modalStyles.modalContainer, 
            modalContainerStyle, 
            fullScreen && { height: '100%', width: '100%' }
          ]}
        >
          {titleHeader ? (
            <View style={[modalStyles.header, headerStyles]}>
              {leftIconHeader && (
                <Pressable onPress={onLeftIconHeaderPress}>
                  <Image source={leftIconHeader} style={styleIconHeader}/>
                </Pressable>
              )}
              <Text style={modalStyles.headerTitle}>{titleHeader}</Text>
              {rightIconHeader && (
                <Pressable onPress={onRightIconHeaderPress}>
                  <Image source={rightIconHeader} style={styleIconHeader}/>
                </Pressable>
              )}
            </View>
          ) : (
            <View style={modalStyles.handleBar}></View>
          )}
            <View style={{flex:1, width:"100%"}}>{children}</View>
          {footer && (
            <View style={[modalStyles.footer, {footerStyle}]}>
              {footer}
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CustomModal);
