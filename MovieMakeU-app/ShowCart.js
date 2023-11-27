import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

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

export default function ShowCart() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const db = getFirestore();
    try {
      const querySnapshot = await getDocs(collection(db, "selectedMovies"));
      const moviesList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id
      }));
      setMovies(moviesList);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  const handleDelete = async (movieId) => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, "selectedMovies", movieId));
      // 데이터를 다시 불러와서 업데이트합니다.
      fetchMovies();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>ID: {item.movieId}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.key)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={item => item.key}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
