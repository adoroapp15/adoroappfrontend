import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const WomenIconFill = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={50}
    height={50}
    {...props}>
    <Path fill="none" d="M0 0h50v50H0z" />
    <Path d="M30.933 32.528a24.382 24.382 0 0 1-.06-1.226c4.345-.445 7.393-1.487 7.393-2.701-.012-.002-.011-.05-.011-.07-3.248-2.927 2.816-23.728-8.473-23.306-.709-.6-1.95-1.133-3.73-1.133-15.291 1.157-8.53 20.8-12.014 24.508l-.007.001.001.006-.001.002.002.001c.014 1.189 2.959 2.212 7.178 2.668-.012.29-.037.649-.092 1.25C19.367 37.238 7.546 35.916 7 45h38c-.545-9.084-12.315-7.762-14.067-12.472z" />
  </Svg>
);
export default WomenIconFill;
