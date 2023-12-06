import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

export default function Start() {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Amarillo': require('./assets/fonts/Amarillo.ttf'), // 폰트 파일의 경로를 정확하게 지정하세요.
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>; // 폰트 로딩 중 화면
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://media.istockphoto.com/id/1478374885/ko/%EC%82%AC%EC%A7%84/%EC%98%81%ED%99%94%EA%B4%80%EC%97%90%EC%84%9C-%EC%98%81%ED%99%94%EB%A5%BC-%EB%B3%B4%EB%8A%94-%EC%A6%90%EA%B1%B0%EC%9A%B4-%EA%B0%80%EC%A1%B1.jpg?s=2048x2048&w=is&k=20&c=2nozAq0obiM6RsQcvmTnTURmfGmIzgPsudOQVAl0mY8=' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MovieMakeU</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent background
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Amarillo', // 커스텀 폰트 적용
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});