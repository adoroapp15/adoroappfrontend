import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const MaleIcon = ({color}) => (
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
      d="M10.25 21.5a7.75 7.75 0 1 0 0-15.5 7.75 7.75 0 0 0 0 15.5Zm11.25-19L16 8m-1-5.5h6.5V9"
    />
  </Svg>
);
export default MaleIcon;
