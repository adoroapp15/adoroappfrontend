// import * as React from 'react';
// import Svg, {Path} from 'react-native-svg';
// const HeartIcon = ({color}) => (
//   <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
//     <Path
//       stroke={color}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.5}
//       d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
//     />
//   </Svg>
// );
// export default HeartIcon;

// import * as React from "react"
// import Svg, { Path } from "react-native-svg"
// const HeartIcon= ({color})=> (
//   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={24} width={24} fill="none">
//     <Path fill="none" d="M0 0h256v256H0z" />
//     <Path
//       // fill="none"
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={8}
//       d="M51.8 121.9a18 18 0 1 0-31.2 18l37 64.1a72 72 0 0 0 124.7-72l-17-29.5a18 18 0 0 0-31.1 18"
//     />
//     <Path
//       fill="none"
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={8}
//       d="M107 145.5 69 79.7a18 18 0 1 0-31.2 18l38 65.8M150.2 148.3l-42-72.8a18 18 0 1 0-31.2 18"
//     />
//     <Path
//       fill="none"
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={8}
//       d="M99 67.7 88.7 49.8a18 18 0 1 0-31.2 18l2.4 4.1M188 191.5a72.1 72.1 0 0 0 14.1-89.4l-17-29.4a18 18 0 1 0-31.2 18"
//     />
//     <Path
//       fill="none"
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={8}
//       d="m156.2 94.7-28.3-49a18 18 0 1 0-31.2 18M176.8 11.3l-4.1 15.4M207.1 25.4l-9.2 13.1M230.6 48.9l-13.1 9.2"
//     />
//   </Svg>
// )
// export default HeartIcon

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartIcon({color}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        d="M51.8 121.9a18 18 0 10-31.2 18l37 64.1a72 72 0 00124.7-72l-17-29.5a18 18 0 00-31.1 18"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
      />
      <Path
        d="M107 145.5L69 79.7a18 18 0 10-31.2 18l38 65.8M150.2 148.3l-42-72.8a18 18 0 10-31.2 18"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
      />
      <Path
        d="M99 67.7L88.7 49.8a18 18 0 10-31.2 18l2.4 4.1M188 191.5a72.1 72.1 0 0014.1-89.4l-17-29.4a18 18 0 10-31.2 18"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
      />
      <Path
        d="M156.2 94.7l-28.3-49a18 18 0 10-31.2 18"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="M176.8 11.3L172.7 26.7"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="M207.1 25.4L197.9 38.5"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="M230.6 48.9L217.5 58.1"
      />
    </Svg>
  );
}

export default HeartIcon;
