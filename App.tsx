import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import data from './src/data/data.json';
import List from './src/comp/List';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <List dataProps={data} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
