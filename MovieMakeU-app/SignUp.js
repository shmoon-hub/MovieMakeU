import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import app from './firebase'; // 파이어베이스 설정 파일 경로 확인 필요
import { useAudioPlayer } from './useAudioPlayer'; // useAudioPlayer 임포트

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const playSound = useAudioPlayer(); // 오디오 재생 함수

  const auth = getAuth(app);

  const handleSignUp = async () => {
    playSound();
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('오류', '입력한 비밀번호가 서로 일치하지 않습니다.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('회원가입 성공:', userCredential.user);
      // 회원가입 성공 알림과 함께 Start 스크린으로 이동합니다. ==> 작동안함 수정필요
      Alert.alert('성공', '회원가입에 성공하였습니다.', [
        { text: 'OK', onPress: () => navigation.navigate('Start') },
      ]);
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert('회원가입 실패', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="가입" onPress={handleSignUp} />
      </View>
    </View>
  );
}

// 스타일 시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
