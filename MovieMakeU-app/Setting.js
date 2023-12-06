import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Setting = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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
      <TouchableOpacity style={[styles.button, styles.developerButton]} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>개발진 소개</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>프론트 엔드, 백엔드 : 문승현 </Text>
            <Text style={styles.modalText}>프론트 엔드, 백엔드 : 현석우 </Text>
            <Text style={styles.modalText}>개발기간 : 2023/10/23 ~ 2023/12/06 </Text>
            <Text style={styles.modalText}>후원 : 460202-04-101242 국민 </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>X  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  settingButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    
  },
  logoutButton: {
    backgroundColor: 'orange',
  },
  suggestionButton: {
    backgroundColor: 'blue',
  },
  developerButton: {
    backgroundColor: 'green',
  },
  adminButton: {
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: 'red',
    width: 50, // 버튼의 너비 설정
    height: 50, // 버튼의 높이 설정
    borderRadius: 25, // 너비와 높이의 절반 크기로 borderRadius 설정
    justifyContent: 'center', // 내부 텍스트를 중앙에 정렬
    alignItems: 'center', // 내부 텍스트를 중앙에 정렬
    padding: 0, // 기존 패딩 제거 (필요에 따라 조정)
  },
});

export default Setting;