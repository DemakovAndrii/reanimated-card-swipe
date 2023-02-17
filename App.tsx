import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SliderComp from './src/comp/SliderComp';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <SliderComp />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
