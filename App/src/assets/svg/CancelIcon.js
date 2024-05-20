import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CancelIcon = ({color}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} >
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 7 11 11m0-11L7 18"
    />
  </Svg>
);
export default CancelIcon;
