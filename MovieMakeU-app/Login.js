import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase'; // 실제 firebase 설정 파일의 경로에 맞게 조정해주세요.
import { useNavigation } from '@react-navigation/native'; // react-navigation이 설치되어 있어야 합니다.

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
  const navigation = useNavigation();

  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공 시 MainMenu 화면으로 이동합니다.
        navigation.navigate('MainMenu');
      })
      .catch((error) => {
        // 로그인 실패 시 오류 코드에 따라 다른 메시지를 설정합니다.
        let message = '';
        switch (error.code) {
          case 'auth/invalid-email':
            message = '잘못된 이메일 형식입니다.';
            break;
          case 'auth/user-disabled':
            message = '이 계정은 사용이 중지되었습니다.';
            break;
          case 'auth/user-not-found':
            message = '계정을 찾을 수 없습니다.';
            break;
          case 'auth/wrong-password':
          case 'auth/invalid-login-credentials': // 이 줄을 추가하세요.
            message = '비밀번호가 잘못되었습니다.';
            break;
          default:
            message = '로그인에 실패했습니다. 다시 시도해주세요.';
        }
        setErrorMessage(message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="이메일 입력"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="비밀번호 입력"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} color="#1E6738" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E6738',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});