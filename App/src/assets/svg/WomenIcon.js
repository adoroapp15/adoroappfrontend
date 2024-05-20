import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const WomenIcon = ({color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 0v6m3-3H9"
    />
  </Svg>
);
export default WomenIcon;
