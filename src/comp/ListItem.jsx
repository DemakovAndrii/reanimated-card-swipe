import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';

const ListItem = ({name, text, photo, index, activeIndex, handleDelete}) => {
  const {width, height} = useWindowDimensions();

  const isActive = index === activeIndex;
  const positionX = useSharedValue(0);
  const inputData = useMemo(() => [-300, 0, 300], []);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      positionX.value = e.translationX;
      isActive
        ? (positionX.value = withSpring(positionX.value))
        : (positionX.value = 0);
    })
    .onEnd(() => {
      if (positionX.value > 100) {
        runOnJS(handleDelete)();
      } else if (positionX.value < -100) {
        runOnJS(handleDelete)();
      } else {
        positionX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = positionX.value;

    const scale = interpolate(positionX.value, inputData, [0.8, 1, 0.8]);
    const opacity = interpolate(positionX.value, inputData, [0.2, 1, 0.2]);
    const rotate = `${positionX.value / 25}deg`;
    const borderRadius = interpolate(positionX.value, inputData, [30, 0, 30]);
    const backgroundColor = interpolateColor(positionX.value, inputData, [
      'rgba(241, 114, 114, 0.5)',
      'rgba(50, 50, 50, 1)',
      'rgba(96, 255, 56, 0.5)',
    ]);

    return {
      opacity,
      transform: [{translateX}, {scale}, {rotate}],
      borderRadius,
      backgroundColor,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          animatedStyle,
          styles.container,
          {width, height, zIndex: index},
        ]}>
        <ScrollView>
          <Image source={{uri: photo}} style={{width, height: 500}} />
          <Text>{name}</Text>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
  },
  text: {
    fontSize: 32,
    maxWidth: 300,
    textAlign: 'center',
    lineHeight: 285,
  },
});
