import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Bars = ({ fill, width, height }) => (
    <Svg fill={fill} height={height} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
        <Path d="M4 6H20M4 12H12M4 18H20" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </Svg>
);

export default Bars;
