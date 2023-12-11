import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase'; // 실제 파이어베이스 설정 파일 경로에 맞게 조정
import { useNavigation } from '@react-navigation/native';
import { useAudioPlayer } from './useAudioPlayer'; // useAudioPlayer 임포트
import LoadingScreen from './LoadingScreen'; // 로딩 화면 임포트

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigation = useNavigation();
  const playSound = useAudioPlayer(); // 오디오 재생 함수

  const auth = getAuth(app);

  const handleLogin = () => {
    playSound(); // 로그인 버튼 클릭 시 소리 재생
    setLoading(true); // 로딩 상태를 true로 설정

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공 시 MainMenu 화면으로 이동
        navigation.navigate('MainMenu');
      })
      .catch((error) => {
        // 로그인 실패 시 오류 메시지 표시
        Alert.alert('Login failed', error.message);
      })
      .finally(() => {
        setLoading(false); // 로딩 상태를 false로 설정
      });
  };

  // 로딩 중일 때 로그인 버튼 비활성화
  const isButtonDisabled = loading;

  // 로딩 중일 때 로딩 화면 표시
  if (loading) {
    return <LoadingScreen />;
  }

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
        <Button
          title="로그인"
          onPress={handleLogin}
          color="#1E6738"
          disabled={isButtonDisabled} // 로딩 중일 때 버튼 비활성화
        />
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
