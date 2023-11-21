import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const API_KEY = "8ba69634dec57d3b503281398fdaef7e"; // 실제 API 키로 교체해야 함

const Top10 = () => {
  const [category, setCategory] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 영화진흥위원회 API로부터 영화 데이터를 가져옵니다.
  const getMovies = async () => {
    const TODAY = new Date();
    const YEAR = TODAY.getFullYear();
    const MONTH = ('0' + (TODAY.getMonth() + 1)).slice(-2);
    const YESTERDAY = ('0' + (TODAY.getDate() - 1)).slice(-2);
    const DATE = `${YEAR}${MONTH}${YESTERDAY}`;
    
    const response = await fetch(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${DATE}`
    );
    const json = await response.json();
    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
    setLoading(false);
  };

  useEffect(() => {
    if (category === 'movies') {
      getMovies();
    }
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={category === 'movies' ? styles.buttonSelected : styles.button} 
          onPress={() => setCategory('movies')}
        >
          <Text style={styles.buttonText}>영화</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={category === 'vod' ? styles.buttonSelectedVOD : styles.button} 
          onPress={() => setCategory('vod')}
        >
          <Text style={styles.buttonText}>VOD</Text>
        </TouchableOpacity>
      </View>
      {loading && category === 'movies' ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView>
          {category === 'movies' ? (
            movies.map((movie) => (
              <View key={movie.movieCd} style={styles.item}>
                <Text style={styles.text}>{movie.rank}. {movie.movieNm}</Text>
                <Text style={styles.textSmall}>개봉일: {movie.openDt}</Text>
                <Text style={styles.textSmall}>일일 관객수: {movie.audiCnt}</Text>
                <Text style={styles.textSmall}>누적 관객수: {movie.audiAcc}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>VOD 목록이 여기에 표시됩니다.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // 배경색을 검은색으로 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000', // 버튼 컨테이너 배경색을 검은색으로 설정
  },
  button: {
    backgroundColor: '#aaa', // 비활성 버튼 배경색을 회색으로 변경
    padding: 10,
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: '#4b7bec', // 영화 버튼 활성화 색상 (파란색)
    padding: 10,
    borderRadius: 5,
  },
  buttonSelectedVOD: {
    backgroundColor: '#28a745', // VOD 버튼 활성화 색상 (초록색)
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // 버튼 텍스트 색상
    fontSize: 16,
  },
  item: {
    backgroundColor: '#4b7bec', // 영화 아이템 배경색
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemVOD: {
    backgroundColor: '#28a745', // VOD 아이템 배경색 (초록색)
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white', // 아이템 텍스트 색상
  },
  textSmall: {
    fontSize: 14,
    color: 'white', // 더 작은 텍스트 색상
  },
});

export default Top10;
