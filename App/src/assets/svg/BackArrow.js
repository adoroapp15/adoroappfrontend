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

// import React from 'react';
// import Svg, {Path} from 'react-native-svg';

// const BackArrow = ({color}) => {
//   return (
//     <Svg width="24" height="24" viewBox="0 0 24 24">
//       <Path
//         fill={color}
//         d="M20.707 11.293l-8-8C12.52 3.105 12.266 3 12 3s-0.52 0.105-0.707 0.293l-8 8C3.105 11.48 3 11.734 3 12s0.105 0.52 0.293 0.707l8 8C11.48 20.895 11.734 21 12 21s0.52-0.105 0.707-0.293l8-8C20.895 12.52 21 12.266 21 12S20.895 11.48 20.707 11.293z"
//       />
//     </Svg>
//   );
// };

// export default BackArrow;
