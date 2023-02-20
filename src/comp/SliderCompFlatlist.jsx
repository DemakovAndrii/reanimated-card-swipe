import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
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

const SliderCompFlatlist = () => {
  const scrollXAnimated = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
      }}>
      <FlatList
        data={data}
        keyExtractor={data.id}
        horizontal
        // inverted
        scrollEnabled={false}
        removeClippedSubviews={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        CellRendererComponent={({item, index, children, style, ...props}) => {
          const newStyle = [style, {zIndex: data.length - index}];
          return (
            <View style={newStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
        renderItem={({item, index}) => {
          const inputRange = [index - 1, index, index + 1];
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [40, 0, 100],
          });
          const scale = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.8, 1, 1.3],
          });
          const opacity = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [1 - 1 / 3, 1, 1.3],
          });

          return (
            <Animated.View
              style={{
                height: 450,
                width: 300,
                left: -150,
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'tomato',
                borderRadius: 20,
                position: 'absolute',
                opacity,
                transform: [{translateX}, {scale}],
              }}>
              <Text>{item.name}</Text>
              <Image
                source={{uri: item.photo}}
                style={{width: 300, height: 300}}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default SliderCompFlatlist;
