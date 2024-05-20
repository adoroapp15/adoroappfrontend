import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PencilIcon1 = ({color}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <Path
      stroke={color}
      d="M15.64 2.926 13.067.36a1.229 1.229 0 0 0-1.739 0L.871 10.86l-.846 3.663a1.224 1.224 0 0 0 1.197 1.47c.094.01.189.01.282 0l3.7-.816L15.639 4.662a1.225 1.225 0 0 0 0-1.736ZM4.41 13.77l-2.791.617.648-2.764L10.14 3.71l2.151 2.147-7.88 7.91Zm8.742-8.772-2.15-2.147 1.182-1.203 2.166 2.162-1.198 1.188Z"
    />
  </Svg>
);
export default PencilIcon1;
