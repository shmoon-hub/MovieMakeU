import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase'; // 실제 firebase 설정 파일의 경로에 맞게 조정해주세요.
import { useNavigation } from '@react-navigation/native'; // react-navigation이 설치되어 있어야 합니다.

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공 시 MainMenu 화면으로 이동합니다.
        navigation.navigate('MainMenu');
      })
      .catch((error) => {
        // 로그인 실패 시 오류 메시지를 보여줍니다.
        Alert.alert('로그인 실패', error.message);
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
});
