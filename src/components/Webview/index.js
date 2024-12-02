import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebComponent = ({uri, onBack}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <TouchableOpacity
          onPress={onBack}
          style={{
            marginTop: 10,
          }}>
          {/* <IcGreyBack width={30} height={30} /> */}
        </TouchableOpacity>
      </TouchableOpacity>
      <WebView source={{uri: uri}} style={{flex: 1}} />
    </View>
  );
};
export default MyWebComponent;
