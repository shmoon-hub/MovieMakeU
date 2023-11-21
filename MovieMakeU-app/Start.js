import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MovieMakeU</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="로그인" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.button}>
          <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} color="#f194ff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, // 좌우 패딩을 0으로 설정합니다.
    backgroundColor: '#add8e6', // 배경색을 설정합니다.
    justifyContent: 'center', // 세로 방향 가운데 정렬
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // 로고 텍스트를 중앙 정렬합니다.
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%', // 버튼 컨테이너의 너비를 100%로 설정합니다.
    paddingHorizontal: 10, // 좌우에 일정한 패딩을 줍니다.
  },
  button: {
    marginBottom: 10, // 버튼 사이의 마진을 설정합니다.
  },
});
