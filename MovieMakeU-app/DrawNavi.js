import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import email from 'react-native-email'; // 이메일 기능을 위해 추가

const DrawNavi = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Start'); // Start.js로 이동합니다.
  };

  const handleSuggestion = () => {
    // 사용자가 이메일 클라이언트를 통해 이메일을 보낼 수 있도록 합니다.
    const to = ['ssy6308msh2@naver.com'] // 수신자 이메일 주소
    email(to, {
        // 이메일 기본 내용을 설정할 수 있습니다.
        subject: '건의 및 개선요구',
        body: '여기에 건의 내용을 작성해주세요.'
    }).catch(console.error)
  };

  return (
    <View style={styles.container}>
      <Button 
        title="로그아웃"
        onPress={handleLogout}
        color="#0000FF"
      />
      <Button 
        title="건의 및 개선요구"
        onPress={handleSuggestion}
        color="#0000FF"
      />
      <Text style={styles.versionText}>
        버전 :v 0.01
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  versionText: {
    color: '#000',
    marginTop: 20,
  },
});

export default DrawNavi;
