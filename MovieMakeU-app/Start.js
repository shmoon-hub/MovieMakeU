import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useFonts, Pacifico_400Regular} from '@expo-google-fonts/pacifico'; // Inter 폰트 추가

export default function Start() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState();

  // Google Fonts를 사용하도록 변경
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  // 폰트 로딩 상태 확인
  useEffect(() => {
    setIsLoading(!fontsLoaded);
  }, [fontsLoaded]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sound/click-sound.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  if (isLoading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://media.istockphoto.com/id/1478374885/ko/%EC%82%AC%EC%A7%84/%EC%98%81%ED%99%94%EA%B4%80%EC%97%90%EC%84%9C-%EC%98%81%ED%99%94%EB%A5%BC-%EB%B3%B4%EB%8A%94-%EC%A6%90%EA%B1%B0%EC%9A%B4-%EA%B0%80%EC%A1%B1.jpg?s=2048x2048&w=is&k=20&c=2nozAq0obiM6RsQcvmTnTURmfGmIzgPsudOQVAl0mY8=' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { fontFamily: 'Pacifico_400Regular' }]}>MovieMakeU</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {playSound(); navigation.navigate('Login'); }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {playSound(); navigation.navigate('SignUp'); }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// 나머지 styles 객체는 그대로 유지

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Pacifico_400Regular',
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