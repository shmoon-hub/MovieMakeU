import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,Linking } from 'react-native';

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

  // vod top10은 로컬로 저장
  const VODList = [
    {
      id: '1',
      title: '1. 용감한 시민',
      url: 'https://www.wavve.com/player/movie?movieid=MV_MM01_MM0000000002&autoplay=y',
    },
    {
      id: '2',
      title: '2. 천박사 퇴마 연구소',
      url: 'https://www.wavve.com/player/movie?movieid=MV_EN01_EN000001067&autoplay=y',
    },
    {
      id: '3',
      title: '3. 크리에이터',
      url: 'https://www.wavve.com/player/movie?movieid=MV_CA01_DY0000011618&autoplay=y',
    },
    {
      id: '4',
      title: '4. 밀수',
      url: 'https://serieson.naver.com/v2/movie/589552',
    },
    {
      id: '5',
      title: '5. 화란',
      url: 'https://www.wavve.com/player/movie?movieid=MV_MX01_MX000000033&autoplay=y',
    },
    {
      id: '6',
      title: '6. 스즈메의 문단속',
      url: 'https://www.wavve.com/player/movie?movieid=MV_MC01_MC000000069&autoplay=y',
    },
    {
      id: '7',
      title: '7. 콘크리트 유토피아',
      url: 'https://www.wavve.com/player/movie?movieid=MV_CI01_LE0000011265&autoplay=y',
    },
    {
      id: '8',
      title: '8. 달짝지근해 : 7510',
      url: 'https://www.wavve.com/player/movie?movieid=MV_MM01_MM0000000001&autoplay=y',
    },
    {
      id: '9',
      title: '9. 타겟',
      url: 'https://www.wavve.com/player/movie?movieid=MV_MX01_MX000000031&autoplay=y',
    },
    {
      id: '10',
      title: '10. 시수',
      url: 'https://www.coupangplay.com/content/81da3c7a-dfda-4bc1-bd97-12af1520e7f6?src=naver_content_search',
    },
    // 추가적인 VOD 목록을 이곳에 넣으세요.
  ];

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
            VODList.map((vod) => (
              <View key={vod.id} style={styles.itemVOD}>
                <Text style={styles.text}>{vod.title}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Linking.openURL(vod.url)} // 여기서 Linking을 사용하여 URL로 이동합니다.
                >
                  <Text style={styles.buttonText}>다시보기</Text>
                </TouchableOpacity>
              </View>
            ))
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
  button: {
    backgroundColor: '#4b7bec', // vod 다시보기 버튼 배경색을 파란색으로 변경
    padding: 10,
    borderRadius: 5,
  },
});

export default Top10;
