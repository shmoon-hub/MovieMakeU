import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase 설정 초기화
const firebaseConfig = {
  apiKey: "AIzaSyDljLuGD6TUhnkgezYrFtGeta4p9VwP1eQ",
  authDomain: "moviemakeu.firebaseapp.com",
  databaseURL: "https://moviemakeu-default-rtdb.firebaseio.com",
  projectId: "moviemakeu",
  storageBucket: "moviemakeu.appspot.com",
  messagingSenderId: "308608060636",
  appId: "1:308608060636:web:a7d7dac61ce6872fa1f819"
};
initializeApp(firebaseConfig);
const db = getFirestore();

export default function Cart() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "selectedMovies"));
        const fetchedItems = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedItems[doc.id] = data;
        });
        setCartItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleAddToCart = () => {
    navigation.navigate('AddCart');
  };

  const handleGoToCart = () => {
    navigation.navigate('ShowCart'); // 'ShowCart'는 네비게이터에 정의된 컴포넌트 이름이어야 합니다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>장바구니 메뉴</Text>
      </View>
      <View style={styles.middleContainer}>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>장바구니 담기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.checkButton]} onPress={handleGoToCart}>
          <Text style={styles.buttonText}>장바구니 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#ccc',
  },
  checkButton: {
    backgroundColor: '#0000ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
