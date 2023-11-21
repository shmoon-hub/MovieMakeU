import React, { useState } from 'react'; // useState를 임포트합니다.
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const navigation = useNavigation();

    // 장바구니 상태를 추가합니다.
    const [cartItems, setCartItems] = useState({}); // useState 훅을 사용하여 cartItems 상태를 추가합니다.


  const handleAddToCart = () => {
    navigation.navigate('AddCart');
  };

  const handleGoToCart = () => {
    navigation.navigate('CheckCart', { selectedMovies: cartItems });
  };

  return (
    <View style={styles.container}>
      {/* 제목을 화면의 특정 위치에 배치 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>장바구니 메뉴</Text>
      </View>
      {/* 버튼 컨테이너를 화면 중간에 배치 */}
      <View style={styles.middleContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>장바구니 담기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.checkButton]}
          onPress={handleGoToCart}
        >
          <Text style={styles.buttonText}>장바구니 확인</Text>
        </TouchableOpacity>
      </View>
      {/* 하단 여백용 빈 뷰 */}
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // 상단 바에서부터의 여백
  },
  titleContainer: {
    height: 100, // 빨간색으로 표시된 영역의 높이
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50, // 이 값을 조정하여 버튼과의 간격을 설정할 수 있습니다.
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
