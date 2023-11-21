import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox'; // expo-checkbox 컴포넌트 사용을 위한 import

const moviesData = [
  { id: '1', title: '아이유 콘서트 : 더 골든 아워', image: require('./MoviePoster/IU_MoviePoster.png') },
  { id: '2', title: '잠', image: require('./MoviePoster/Sleep_MoviePoster.png') },
  { id: '3', title: '베니스 유령 살인사건', image: require('./MoviePoster/Venice_MoviePoster.png') },
  // ... 여기에 더 많은 영화 데이터를 추가할 수 있습니다.
];

export default function AddCart() {
  const [selectedMovies, setSelectedMovies] = useState({});
  const navigation = useNavigation();

  const handleSelectMovie = (id) => {
    setSelectedMovies((prevSelectedMovies) => ({
      ...prevSelectedMovies,
      [id]: !prevSelectedMovies[id]
    }));
  };

  const handleAddToCart = () => {
    navigation.navigate('CheckCart', { selectedMovies });                      // 파이어베이스를 연동하는것으로 수정
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Checkbox
        value={selectedMovies[item.id]}
        onValueChange={() => handleSelectMovie(item.id)}
        color={selectedMovies[item.id] ? '#4630EB' : undefined} // 체크박스 색상 설정
      />
      <Image
        source={item.image} // 영화 포스터 이미지 경로
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>추가할 영화 선택</Text>
      <FlatList
        data={moviesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.movieList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>장바구니에 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieList: {
    alignSelf: 'stretch',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieImage: {
    width: 50, // 영화 포스터 이미지의 너비
    height: 75, // 영화 포스터 이미지의 높이
    resizeMode: 'contain',
  },
  movieTitle: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
