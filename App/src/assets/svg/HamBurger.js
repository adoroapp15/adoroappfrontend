import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const HamBurger = ({color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3 7h18M3 12h18M3 17h18"
    />
  </Svg>
);
export default HamBurger;
