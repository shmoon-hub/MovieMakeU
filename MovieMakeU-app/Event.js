import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Event = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Background color of the screen
  },
  text: {
    fontSize: 20,
    color: 'black', // Text color
  },
});

export default Event;
