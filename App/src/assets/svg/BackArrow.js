import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BackArrow = ({color}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Path
      // stroke="#000"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12H5M12 19l-7-7 7-7"
    />
  </Svg>
);
export default BackArrow;