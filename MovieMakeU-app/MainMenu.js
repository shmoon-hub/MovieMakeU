import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from "expo-font";

export default function MainMenu() {
  const navigation = useNavigation();

  const moviePosters = [
    { source: require('./MoviePoster/DR.Cheon_MoviePoster.png'), screen: 'DrCheon' },
    { source: require('./MoviePoster/Sleep_MoviePoster.png'), screen: 'Sleep' },
    { source: require('./MoviePoster/Venice_MoviePoster.png'), screen: 'Venice' },
    { source: require('./MoviePoster/IU_MoviePoster.png'), screen: 'IUMovie' },
    { source: require('./MoviePoster/GOG_MoviePoster.png'), screen: 'GOG' },
  ];

  const vodposters = [
    require('./VodPoster/Avatar_VodPoster.png'),
    require('./VodPoster/Avengers_VodPoster.png'),
    require('./VodPoster/Matrix_VodPoster.png'),
    require('./VodPoster/Ode_VodPoster.png'),
    require('./VodPoster/Titanic_VodPoster.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./MainMenuAS/logo.png')}
          style={styles.logo}
        />
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('./MainMenuAS/cart-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DrawNavi')}>
            <Image
              source={require('./MainMenuAS/DrawNavigation-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.currentScreeningsSection}>
        <Text style={styles.currentScreeningsTitle}>현재상영작</Text>
        <ScrollView horizontal style={styles.movieScroll}>
          {moviePosters.map((poster, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate(poster.screen)}
              style={styles.posterTouchable}
            >
              <Image
                source={poster.source}
                style={styles.poster}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.menuButtons}>
        <TouchableOpacity style={[styles.button, styles.movieButton]} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>영화관</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.compareButton]} onPress={() => navigation.navigate('Top10')}>
          <Text style={styles.buttonText}>TOP 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reviewButton]} onPress={() => navigation.navigate('Event')}>
          <Text style={styles.buttonText}>무료이벤트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.vodSection}>
        <Text style={styles.vodTitle}>VOD</Text>
        <ScrollView horizontal style={styles.vodScroll}>
          {vodposters.map((poster, index) => (
            <Image
              key={index}
              source={poster}
              style={styles.vodPoster}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  currentScreeningsSection: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  currentScreeningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 10,
  },
  movieScroll: {
    paddingLeft: 10,
  },
  posterTouchable: {
    marginHorizontal: 5,
  },
  poster: {
    width: 120,
    height: 180,
    resizeMode: 'contain',
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieButton: {
    backgroundColor: 'lightgreen',
  },
  compareButton: {
    backgroundColor: 'blue',
  },
  reviewButton: {
    backgroundColor: 'orange',
  },
  vodSection: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  vodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 10,
  },
  vodScroll: {
    paddingLeft: 10,
  },
  vodPoster: {
    width: 120,
    height: 180,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
});
