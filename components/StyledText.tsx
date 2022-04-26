import * as React from 'react';

import { Text, TextProps } from './Themed';
import Layout,  {normalize} from '../constants/Layout';

export function OpenSansBold(props: TextProps) {
  const [textSize, setTextSize] = React.useState(20);
  if (Layout.isSmallDevice) 
    setTextSize(textSize - 6);
  return <Text {...props} style={[{ fontFamily: 'open-sans-bold', fontSize: normalize(textSize) }, props.style]} />;
}

export function OpenSansRegular(props: TextProps) {
  const [textSize, setTextSize] = React.useState(20);
  if (Layout.isSmallDevice) 
    setTextSize(textSize - 6);
  return <Text {...props} style={[{ fontFamily: 'open-sans-regular', fontSize: normalize(textSize) }, props.style]} />;
}
