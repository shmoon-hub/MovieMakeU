import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import app from './firebase'; // 실제 firebase 설정 파일의 경로에 맞게 조정해주세요.

const AdminInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // 구독 해제
    return subscriber;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.button, styles.titleButton, styles.title]}>
        <Text style={styles.buttonText}>현재 로그인한 사용자 정보</Text>
      </View>
      {user ? (
        <>
          <View style={[styles.button, styles.emailButton]}>
            <Text style={styles.infoTextWhite}>이메일: {user.email}</Text>
          </View>
          <View style={[styles.button, styles.uidButton]}>
            <Text style={styles.infoTextBlack}>UID: {user.uid}</Text>
          </View>
          <View style={[styles.button, styles.creationButton]}>
            <Text style={styles.infoTextWhite}>생성한 날짜: {user.metadata.creationTime}</Text>
          </View>
          <View style={[styles.button, styles.lastLoginButton]}>
            <Text style={styles.infoTextWhite}>마지막으로 로그인한 날짜: {user.metadata.lastSignInTime}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.infoTextWhite}>No user is logged in</Text>
      )}
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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  titleButton: {
    backgroundColor: 'black',
  },
  title: {
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  emailButton: {
    backgroundColor: 'orange',
  },
  uidButton: {
    backgroundColor: 'yellow',
  },
  creationButton: {
    backgroundColor: 'grey',
  },
  lastLoginButton: {
    backgroundColor: 'blue',
  },
  infoTextWhite: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  infoTextBlack: {
    fontSize: 16,
    color: 'black', // UID 텍스트 색상을 검은색으로 설정합니다.
    textAlign: 'center',
  },
});

export default AdminInfo;
