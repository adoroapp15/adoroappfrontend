import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BlockIcon = ({color}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10m-7-4L20 6M8 9.17"
    />
  </Svg>
);
export default BlockIcon;
