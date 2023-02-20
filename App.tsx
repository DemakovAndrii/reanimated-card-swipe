import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SliderComp from './src/comp/SliderComp';
import SliderCompMap from './src/comp/SliderCompMap';
import SliderCompFlatlist from './src/comp/SliderCompFlatlist';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {/* <SliderComp /> */}
        {/* <SliderCompMap /> */}
        <SliderCompFlatlist />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
