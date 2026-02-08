import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { G, Rect } from 'react-native-svg';

const Spinner = ({color="#FFF"}) => {
  const animations = Array.from({ length: 12 }, () => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    animations.forEach((anim, index) => {
      const delay = (index * 1000) / 12; // Delay for each rectangle
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false, // Opacity animations
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false, // Opacity animations
          }),
        ])
      );
      // Start the animation after the calculated delay
      setTimeout(() => {
        loop.start();
      }, delay);
    });
  }, [animations]); // Add animations to the dependency array

  const rects = animations.map((anim, index) => {
    const rotation = index * 30;
    return (
      <G key={index} transform={`rotate(${rotation} 50 50)`}>
        <AnimatedRect
          fill={color}
          height="12"
          width="6"
          rx="3"
          ry="6"
          x="47"
          y="24"
          opacity={anim} // Directly use opacity instead of style
        />
      </G>
    );
  });

  return (
    <View style={styles.container}>
      <Svg width={100} height={100} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        {rects}
      </Svg>
    </View>
  );
};

// Custom Animated Rect component
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Spinner;
