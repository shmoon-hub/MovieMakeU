import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ImageBackground, Alert } from 'react-native';
import * as Location from 'expo-location';
import backgroundImage from './Background/MovieFind_br.png'; // 이미지 경로에 맞게 수정하세요

export default function Map() {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('오류', '위치 정보에 접근할 수 없습니다');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location);
    })();
  }, []);

  const openMap = (theater) => {
    if (!currentPosition) {
      Alert.alert('오류', '위치 정보를 사용할 수 없습니다');
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${theater} near ${currentPosition.coords.latitude},${currentPosition.coords.longitude}`;
    Linking.openURL(url).catch(err => console.error("페이지를 로드할 수 없습니다", err));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={{ ...styles.header, color: 'black' }}>영화관 찾기</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => openMap('CGV')}
        >
          <Text style={styles.buttonText}>CGV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => openMap('메가박스')}
        >
          <Text style={styles.buttonText}>메가박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={() => openMap('롯데시네마')}
        >
          <Text style={styles.buttonText}>롯데시네마</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // 배경화면
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
