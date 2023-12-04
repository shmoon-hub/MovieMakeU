import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView
} from 'react-native';

const { width } = Dimensions.get('window');
const bannerWidth = width - 30; // 전체 너비에서 좌우 여백 15씩 뺀 값

const initialBanners = [
  {
    id: '1',
    title: "[청라점] 조조 시간대 연장에 추가 할인까지!",
    date: "2023.11.20 - 2023.11.30",
    imageUrl: "https://file.cineq.co.kr/j.aspx?guid=87cef9c6d26145fc8724ac978cad3b58",
    link: "https://cineq.co.kr/Event/Info?eventId=2583&eventSort=0",
  },
  {
    id: '2',
    title: "[서울의 봄] IMAX 특가로 봄",
    date: "2023.11.22 - 2023.11.30",
    imageUrl: "https://img.cgv.co.kr/WebApp/contents/eventV4/38924/16994915909860.jpg",
    link: "http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?seq=38924&menu=004",
  },
  {
    id: '3',
    title: "[메가박스X중앙일보] 더중플 무료 체험하고, 메가박스 2인패키지도 받고!",
    date: "2023.11.15 - 2023.11.30",
    imageUrl: "https://megabox.co.kr/SharedImg/editorImg/2023/11/27/W5vtEgz0XKWuInx8CA2sd6tuHfxAYR9A.jpg",
    link: "https://megabox.co.kr/event/detail?eventNo=14506",
  },
  {
    id: '4',
    title: "수고한 y에게 혜택을!",
    date: "2023.11.16 - 2024.12.06",
    imageUrl: "https://caching.lottecinema.co.kr//Media/Event/6ee95c895c64483b84a6c1329e3e5805.jpg",
    link: "https://event.lottecinema.co.kr/NLCHS/Event/EventTemplateInfo?eventId=501010048523005",
  },
  // 추가 배너 데이터가 있다면 여기에 포함시키세요.
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanners, setFilteredBanners] = useState(initialBanners);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredBanners(initialBanners);
      return;
    }
    const filteredData = initialBanners.filter((banner) =>
      banner.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBanners(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="검색하기"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredBanners.map((banner) => (
          <Banner key={banner.id} {...banner} />
        ))}
      </ScrollView>
    </View>
  );
}

const Banner = ({ title, date, imageUrl, link }) => (
  <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.banner}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.bannerImage}
    />
    <Text style={styles.bannerTitle}>{title}</Text>
    <Text style={styles.bannerDate}>{date}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // 상단 여백
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    height: 40,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2, // 안드로이드용 그림자
    shadowColor: '#000', // iOS용 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS용 그림자
    shadowOpacity: 0.1, // iOS용 그림자
    shadowRadius: 1, // iOS용 그림자
  },
  scrollView: {
    paddingVertical: 5,
  },
  banner: {
    borderRadius: 10,
    overflow: 'hidden', // 이미지의 borderRadius를 적용하기 위함
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 15,
    elevation: 2, // 안드로이드용 그림자
    shadowColor: '#000', // iOS용 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS용 그림자
    shadowOpacity: 0.1, // iOS용 그림자
    shadowRadius: 1, // iOS용 그림자
  },
  bannerImage: {
    width: '100%',
    height: bannerWidth * 9 / 16, // 높이를 너비의 16:9 비율로 설정
  },
  bannerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  bannerDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
});
