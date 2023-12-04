import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // 벡터 아이콘 기능 추가

const Setting = () => {
  const navigation = useNavigation();

  const openEmail = () => {
    Linking.openURL('mailto:ssy6308msh2@naver.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingButton}>
        <Text style={styles.settingButtonText}>Setting</Text>
      </View>
      <Text style={styles.headerText}>일반</Text>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => navigation.navigate('Start')}>
        <Text style={styles.buttonText}>로그아웃</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.suggestionButton]} onPress={openEmail}>
        <Text style={styles.buttonText}>건의사항</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.developerButton]} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.buttonText}>개발진 소개</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>관리자</Text>
      <TouchableOpacity style={[styles.button, styles.adminButton]} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.buttonText}>관리자 메뉴</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 10, // 둥근 모서리 추가
    marginTop: 50, // 상단 여백 추가
    alignSelf: 'center', // 중앙 정렬
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    alignSelf: 'flex-start', // 텍스트를 왼쪽으로 정렬
    paddingLeft: 10, // 왼쪽 여백 추가
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 버튼 안의 내용을 양 끝으로 정렬합니다.
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingLeft: 10, // 이 값은 왼쪽 여백을 위해 그대로 유지하거나 조절할 수 있습니다.
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    // marginRight 값을 제거하거나 줄입니다.
  },
  arrowText: {
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'orange', // 기존 로그아웃 버튼 색상 유지
  },
  suggestionButton: {
    backgroundColor: 'blue', // 건의사항 버튼 색상 변경
  },
  developerButton: {
    backgroundColor: 'green', // 개발진 소개 버튼 색상 변경
  },
  adminButton: {
    backgroundColor: 'red', // 관리자 메뉴 버튼 색상 변경
  },
  settingButton: {
    paddingVertical: 8,
    paddingHorizontal: 20, // 버튼 내부 좌우 여백을 설정합니다. 필요에 따라 조절하세요.
    backgroundColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    width: '50%', // 버튼의 가로 길이를 화면의 80%로 설정합니다.
    alignItems: 'center', // 텍스트 중앙 정렬
    justifyContent: 'center', // 텍스트 중앙 정렬
  },
  settingButtonText: {
    color: 'white', // 버튼 안 텍스트 색상을 흰색으로
    fontSize: 18, // 폰트 사이즈
    fontWeight: 'bold', // 글자 굵기
  },
});

export default Setting;
