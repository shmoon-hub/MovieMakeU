// 원본 App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 기존 컴포넌트들 임포트
import Start from './Start';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';
import Setting from './Setting'
import Cart from './Cart';        // 수정함 기존 ./cart => ./Cart
import AddCart from './AddCart';
//import CheckCart from './CheckCart';
import Map from './Map';
import Event from './Event';
import Top10 from './Top10';
import ShowCart from './ShowCart';

// MovieReview 폴더 내 컴포넌트들 임포트
import DrCheon from './MovieReview/Dr_cheon';
import GOG from './MovieReview/GOG';
import IUMovie from './MovieReview/IU_movie';
import Sleep from './MovieReview/Sleep';
import Venice from './MovieReview/Venice';

// VodReview 폴더 내 컴포넌트들 임포트
import Avatar from './VodReview/Avatar';

// setting관련 컴포넌트 임포트
import Info from './Info';
import Admin from './Admin';
import AdminInfo from './AdminInfo';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Cart" component={Cart}/>
        <Stack.Screen name="AddCart" component={AddCart} />
        <Stack.Screen name="Map" component={Map}/>
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Top10" component={Top10} />
        <Stack.Screen name="DrCheon" component={DrCheon} />
        <Stack.Screen name="GOG" component={GOG} />
        <Stack.Screen name="IUMovie" component={IUMovie} />
        <Stack.Screen name="Sleep" component={Sleep} />
        <Stack.Screen name="Venice" component={Venice} />
        <Stack.Screen name="Avatar" component={Avatar} />   
        <Stack.Screen name="ShowCart" component={ShowCart} /> 
        <Stack.Screen name="Setting" component={Setting} />  
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="AdminInfo" component={AdminInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
