import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SvgSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Duration for one full rotation (1 second)
        useNativeDriver: true, // Optimizes animation
        easing: Easing.linear, // Smooth continuous rotation
      })
    ).start();
  }, [spinValue]);

  // Interpolating the spin value to degrees for smooth rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width={40}
          height={40}
          preserveAspectRatio="xMidYMid"
        >
          <Path
            d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
            fill="#e15b64"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SvgSpinner;
