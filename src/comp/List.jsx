import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ListItem from './ListItem';

const List = ({dataProps}) => {
  const [data, setData] = useState(dataProps);
  const [activeIndex, setActiveIndex] = useState(data.length - 1);

  // const nextHandler = () => {
  //   if (activeId + 1 < data.length) {
  //     setActiveId(activeId + 1);
  //   }
  // };
  // const prevHandler = () => {
  //   if (activeId > 0) {
  //     setActiveId(activeId - 1);
  //   }
  // };

  const handleDelete = useCallback(() => {
    setData([...data.filter((_, idx) => activeIndex !== idx)]);
    setActiveIndex(prev => prev - 1);
  }, [data, activeIndex]);

  return (
    <View style={styles.container}>
      {data.map(({id, name, text, photo}, index) => {
        return (
          <ListItem
            key={id}
            name={name}
            text={text}
            photo={photo}
            index={index}
            activeIndex={activeIndex}
            handleDelete={handleDelete}
          />
        );
      })}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
