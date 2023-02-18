import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SliderComp from './src/comp/SliderComp';
import SliderCompMap from './src/comp/SliderCompMap';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {/* <SliderComp /> */}
        <SliderCompMap />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
