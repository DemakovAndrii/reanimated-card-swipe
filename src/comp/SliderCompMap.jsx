import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import data from '../data/data.json';
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

const SliderCompMap = () => {
  const [activeId, setActiveId] = useState(0);
  const {width, height} = useWindowDimensions();

  const position = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  const nextHandler = () => {
    if (activeId + 1 < data.length) {
      setActiveId(activeId + 1);
    }
  };
  const prevHandler = () => {
    if (activeId > 0) {
      setActiveId(activeId - 1);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      position.value = e.translationX;
      if (position.value > 0) {
        scaleAnimation.value = withSpring(1 - position.value * 0.0004);
      } else {
        scaleAnimation.value = withSpring(1 + position.value * 0.0004);
      }
    })

    .onEnd(e => {
      if (position.value > 50) {
        position.value = withTiming(0, {duration: 100});
        runOnJS(prevHandler)();
      } else if (position.value < -50) {
        position.value = withTiming(0, {duration: 100});
        runOnJS(nextHandler)();
      } else {
        position.value = withTiming(0, {duration: 100});
      }
      scaleAnimation.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: position.value / 2},
      {scale: scaleAnimation.value},
      {rotateZ: `${position.value / 30}deg`},
    ],

    backgroundColor: interpolateColor(
      position.value,
      [-300, 0, 300],
      ['rgba(241, 114, 114, 0)', 'rgba(50, 50, 50, 1)', 'rgba(96, 255, 56, 0)'],
    ),

    borderRadius: interpolate(position.value, [-300, 0, 300], [20, 0, 20]),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={{
          height,
          backgroundColor: 'black',
        }}>
        <ScrollView>
          <View style={{height: '100%'}}>
            {data.map(({id, name, text}, index) => {
              return (
                <View
                  key={id}
                  style={[{alignItems: 'center', justifyContent: 'center'}]}>
                  {activeId === index ? (
                    <Animated.View
                      style={[
                        animatedStyle,
                        styles.card,
                        {width, zIndex: 2, backgroundColor: 'tomato'},
                      ]}>
                      <Text style={styles.text}>{name}</Text>
                      <Text style={styles.text}>{index}</Text>
                      <Text style={styles.text}>{text}</Text>
                    </Animated.View>
                  ) : activeId > index ? (
                    <View style={{zIndex: 0}}></View>
                  ) : (
                    <View style={[styles.card, {width, zIndex: 1}]}>
                      <Text style={styles.text}>{name}</Text>
                      <Text style={styles.text}>{text}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </GestureDetector>
  );
};

export default SliderCompMap;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  text: {
    fontSize: 32,
    maxWidth: 300,
    textAlign: 'center',
    lineHeight: 285,
  },
});
