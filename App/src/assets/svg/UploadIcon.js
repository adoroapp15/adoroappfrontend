import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const UploadIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke="#FF8A65"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 12h12m-6 6V6"
    />
  </Svg>
);
export default UploadIcon;
