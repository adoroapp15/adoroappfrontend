// import * as React from 'react';
// import Svg, {Circle, Path} from 'react-native-svg';
// const Seacrh = props => (
//   <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={27}
//     height={27}
//     fill="none"
//     {...props}>
//     <Circle
//       cx={13.237}
//       cy={13.237}
//       r={10.112}
//       stroke="#07142E"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.5}
//     />
//     <Path
//       stroke="#07142E"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.5}
//       d="m20.27 20.796 3.965 3.954"
//     />
//   </Svg>
// );
// export default Seacrh;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SearchIcon = ({color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
    />
  </Svg>
);
export default SearchIcon;
