import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Info = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>개발진 소개</Text>
      <Text style={styles.text}>프론트 엔드, 백엔드 : 문승현</Text>
      <Text style={styles.text}>프론트 엔드, 백엔드 : 현석우</Text>
      <Text style={styles.text}>개발 기간 : 2023/10/24 ~ 2023/12/07</Text>
      <Text style={styles.text}>감사합니다! 후원은 460202-04-101242 국민은행 문승현</Text>     
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

export default Info;
