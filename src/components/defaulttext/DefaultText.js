import { Text as DefaultText } from 'react-native';

export function Text(props) {
  return (
    <DefaultText
      {...props}
      style={[{ fontFamily: 'OpenSansBold' }, props.style]}
    />
  );
}
