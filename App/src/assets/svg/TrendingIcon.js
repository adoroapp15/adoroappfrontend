import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const TrendingIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill="none"
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.5 9.5-4.2 4.2-1.6-2.4-3.2 3.2"
    />
    <Path
      fill="none"
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.5 9.5h2v2"
    />
    <Path
      fill="none"
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Zm-4-6"
    />
  </Svg>
);
export default TrendingIcon;
