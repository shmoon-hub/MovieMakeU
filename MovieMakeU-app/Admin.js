import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Admin = () => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const checkPasswordAndNavigate = () => {
    if (password === '7453') {
      navigation.navigate('AdminInfo'); // 'AdminInfo'는 네비게이션에 정의된 스크린 이름이어야 합니다.
    } else {
      Alert.alert('오류', '비밀번호가 틀렸습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>관리자 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={checkPasswordAndNavigate}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24, // 적절한 크기로 설정
    color: '#0000FF', // 이것은 기본적인 파란색입니다. 실제 색상 코드를 알고 있다면 여기에 적용하세요.
    marginBottom: 30, // 텍스트와 입력 필드 사이에 적절한 여백을 줍니다.
  },
  input: {
    width: '80%', // 입력 필드의 너비
    padding: 10,
    borderWidth: 1,
    borderColor: 'black', // 입력 필드 테두리 색상
    marginBottom: 20,
  },
  button: {
    width: '80%', // 버튼 너비
    padding: 15,
    backgroundColor: 'red', // 버튼 배경 색상
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // 버튼 텍스트 색상
    fontSize: 20,
  },
});

export default Admin;
