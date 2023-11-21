// 천박사 원본 코드
import React, { useState, useEffect } from 'react'; // useState, useEffect 추가
import { WebView } from 'react-native-webview'; // WebView를 import 합니다.
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import * as Font from "expo-font";


const Venice = () => {
  const [fontLoaded, setFontLoaded] = useState(false);    // 추가된 내용

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'BarganSale': require('../assets/fonts/KCC-Chassam.ttf'), // 폰트 파일의 정확한 위치를 확인하세요
          // 새로운 폰트도 추가합니다.
          'YoonYeongRg': require('../assets/fonts/Ownglyph_2022_UWY_Yoon_Yeong-Rg.ttf'),
        });
        setFontLoaded(true);
      } catch (err) {
        console.error('An error occurred while loading fonts:', err);
      }
    }
    loadFonts();
  }, []);


  const handlePressBooking = () => {
    const url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bkEw&pkid=68&os=31468249&qvt=0&query=%EB%B2%A0%EB%8B%88%EC%8A%A4%20%EC%9C%A0%EB%A0%B9%20%EC%82%B4%EC%9D%B8%EC%82%AC%EA%B1%B4%20%EB%B3%B4%EB%9F%AC%EA%B0%80%EA%B8%B0";
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  if (!fontLoaded) {                 // 추가된 내용2
    return <View style={styles.container}><Text>Loading Fonts...</Text></View>;
  }

  // 새로 추가한 내용
  const renderVideo = () => {
    const videoEmbedHTML = `
      <html>
      <body style="margin:0;padding:0;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/z9zpWdInFXY" frameborder="0" allowfullscreen></iframe>
      </body>
      </html>
    `;

    return Platform.OS === 'web' ? (
      <div dangerouslySetInnerHTML={{ __html: videoEmbedHTML }} />
    ) : (
      <WebView
        style={styles.webView}
        source={{ html: videoEmbedHTML }}
        allowsFullscreenVideo
      />
    );
  };

  return ( 
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Image
          source={require('../MovieImage/Venice_image/Venice_poster.png')}
          style={styles.poster}
        />
        <Text style={styles.movieTitle}>베니스 유령 살인사건</Text>
        <Text style={[styles.movieSynopsis, fontLoaded && styles.customFont]}>
          목격자 없는 살인, 죽음은 시작에 불과했다!
        </Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>출현</Text>
        </View>
        <View style={styles.actorInfoContainer}>                     
          <Image
            source={require('../MovieImage/Venice_image/KennethBranagh.jpg')} // 배우 이미지 경로를 업데이트하세요.
            style={styles.actorImage}
          />
          <View style={styles.actorRoleContainer}>
          <Text style={[styles.actorRoleText, { fontFamily: 'YoonYeongRg' }]}>케네스 브래너 : 에르큘 포와로 역</Text>       
          </View>
        </View>
        <View style={styles.actorInfoContainer}>                     
          <Image
            source={require('../MovieImage/Venice_image/MichelleYeoh.jpg')} // 배우 이미지 경로를 업데이트하세요.
            style={styles.actorImage}
          />
          <View style={styles.actorRoleContainer}>
          <Text style={[styles.actorRoleText, { fontFamily: 'YoonYeongRg' }]}>양자경 : 조이스 레이놀즈 역</Text>       
          </View>
        </View>
        <View style={styles.actorInfoContainer}>                     
          <Image
            source={require('../MovieImage/Venice_image/JamieDornan.jpg')} // 배우 이미지 경로를 업데이트하세요.
            style={styles.actorImage}
          />
          <View style={styles.actorRoleContainer}>
          <Text style={[styles.actorRoleText, { fontFamily: 'YoonYeongRg' }]}>제이미 도넌 : 레슬리 페리에 역</Text>       
          </View>
        </View>
        <View style={styles.actorInfoContainer}>                     
          <Image
            source={require('../MovieImage/Venice_image/TinaFey.jpg')} // 배우 이미지 경로를 업데이트하세요.
            style={styles.actorImage}
          />
          <View style={styles.actorRoleContainer}>
          <Text style={[styles.actorRoleText, { fontFamily: 'YoonYeongRg' }]}>타나 페이 : 아르아드네 올리버 역</Text>       
          </View>
        </View>
        <View style={styles.actorInfoContainer}>                     
          <Image
            source={require('../MovieImage/Venice_image/KellyReilly.jpg')} // 배우 이미지 경로를 업데이트하세요.
            style={styles.actorImage}
          />
          <View style={styles.actorRoleContainer}>
          <Text style={[styles.actorRoleText, { fontFamily: 'YoonYeongRg' }]}>켈리 라일리 : 로웨나 드레이크 역</Text>       
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>평점</Text>
        </View>
        <Text style={styles.star}>★ ★ ★ ★</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>평론가 평</Text>
        </View>
        <Text style={[styles.movieSynopsis, fontLoaded && styles.customFont]}>
          새삼 성가시게 느껴지는 CG의 범람    - 이용철 
        </Text>
        <Text style={[styles.movieSynopsis, fontLoaded && styles.customFont]}>
          스타 캐스팅으로도 가려지지 않는 호러 코미니 액션의 조악한 집합 - 이동진 
        </Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>유튜버 리뷰</Text>
        </View>
        {fontLoaded && renderVideo()}
        <View style={styles.button}>
          <Text style={styles.buttonText}>해외 리뷰</Text>
        </View>
        <Image
          source={require('../MovieImage/Venice_image/VeniceGlobalRV.png')} // 이미지 파일의 경로를 수정하세요.
          style={styles.reviewImage}
        />
      </ScrollView>
      <TouchableOpacity style={styles.bookingButton} onPress={handlePressBooking}>
        <Text style={styles.bookingButtonText}>예매하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 70, // '예매하기' 버튼 높이보다 큰 값으로 설정
  },
  poster: {
    width: '90%',
    alignSelf: 'center',
    height: undefined,
    aspectRatio: 500 / 777,
    resizeMode: 'contain',
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  movieSynopsis: {
    color: 'white',
    fontSize: 16,
    padding: 20,
  },
  roleContainer: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginHorizontal: 10, // 양 옆에 10의 마진 추가
    width: '100%', // 가로로 꽉 차게 조정
    alignSelf: 'center',
  },
  roleText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // 텍스트를 가운데 정렬합니다.
  },
  actorInfoContainer: {
    flexDirection: 'row', // 자식 요소들을 수평으로 배치합니다.
    alignItems: 'center', // 자식 요소들을 수직 축에서 중앙 정렬합니다.
    justifyContent: 'center', // 자식 요소들을 컨테이너 중앙에 배치합니다.
    marginTop: 10, // 위쪽 마진을 설정합니다.
    flex: 1, // 부모 컨테이너를 꽉 채우도록 합니다.
  },
  actorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 70, // 이미지와 텍스트 컨테이너 사이의 오른쪽 마진을 설정합니다.
  },
  actorRoleContainer: {
    // flex: 1, 제거합니다 - 정사각형 크기를 고정하기 위해
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 16, // 내부 여백을 동일하게 설정합니다.
    marginTop: 10,
    marginBottom: 10,
    width: 120, // 정사각형의 너비와 높이를 동일하게 설정합니다.
    height: 120, // 정사각형의 너비와 높이를 동일하게 설정합니다.
    //alignSelf: 'flex-end', // 부모 컴포넌트 내에서 오른쪽에 배치합니다.
    // marginHorizontal: 20, // alignSelf을 사용하여 중앙 정렬하는 경우, 이 속성은 필요 없습니다.
  },
  
  actorRoleText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  bookingButton: {
    padding: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bookingButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 50, // 좌우 패딩
    borderWidth: 2, // 테두리 두께
    borderColor: 'white', // 테두리 색상
    borderRadius: 20, // 둥근 모서리의 반지름
    backgroundColor: 'black', // 배경 색상
    marginTop: 10, // 위쪽 마진
    marginHorizontal: 15, // 좌우 마진
    height: 30, // 버튼의 높이를 직접 설정
    marginBottom: 10, // 하단 마진 추가
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // 글자 크기
    textAlign: 'center', // 글자 정렬
  },
  customFont: {            // 폰트 추가
    fontFamily: 'BarganSale',
  },
  star: {                       // 별 스타일
    color: 'red', // 별의 색상을 설정합니다.
    fontSize: 40, // 별의 크기를 설정합니다.
    textAlign: 'center', // 별을 가운데 정렬합니다.
    marginVertical: 10, // 별 위아래로 마진을 추가합니다.
  },
  webView: {
    height: 200, // 원하는 높이 설정
  },
  reviewImage: {                                          // 해외 리뷰 스타일
    width: '100%', // 이미지의 너비를 설정합니다.
    height: 200, // 이미지의 높이를 설정합니다.
    resizeMode: 'contain', // 이미지의 비율을 유지하면서 컨테이너에 맞춥니다.
    marginTop: 10, // 이미지 위의 마진을 설정합니다.
  },
  
});

export default Venice;
