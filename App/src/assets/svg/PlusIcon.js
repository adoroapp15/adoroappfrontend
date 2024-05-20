import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PlusIcon =({color}) => (
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
      d="M6 12h12m-6 6V6"
    />
  </Svg>
);
export default PlusIcon;
