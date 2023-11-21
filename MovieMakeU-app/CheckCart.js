import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CheckCart() {
  const route = useRoute();

  // AddCart.js에서 전달받은 선택된 영화 목록
  const selectedMovies = route.params?.selectedMovies || {};

  // 영화 데이터가 실제로는 어떤 형태로 저장되어 있을지는 알 수 없으므로, 
  // 여기서는 가정으로 각 id에 해당하는 영화 정보를 가지고 있는 객체를 만듭니다.
  // 실제 앱에서는 이 부분을 데이터베이스 조회 등으로 대체해야 합니다.
  const moviesData = {
    '1': { title: '아이유 콘서트 : 더 골든 아워', image: require('./MoviePoster/IU_MoviePoster.png') },
    '2': { title: '잠', image: require('./MoviePoster/Sleep_MoviePoster.png') },
    '3': { title: '베니스 유령 살인사건', image: require('./MoviePoster/Venice_MoviePoster.png') },
    // ... 여기에 더 많은 영화 데이터를 추가할 수 있습니다.
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>장바구니 확인</Text>
      {Object.entries(selectedMovies).map(([id, isSelected]) => {
        if (isSelected) {
          // 선택된 영화의 상세 데이터를 가져옵니다.
          const movie = moviesData[id];
          return (
            <View key={id} style={styles.movieItem}>
              <Image source={movie.image} style={styles.movieImage} />
              <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
          );
        } else {
          return null;
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  movieImage: {
    width: 50,
    height: 75,
    resizeMode: 'contain',
  },
  movieTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
});
