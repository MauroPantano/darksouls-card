import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import ScreenFC from './models/ScreenFC';
import styleCard from './components/style';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Card1: ScreenFC<"Home"> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(String);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    navigation.navigate('Detail', {selectedValue: value});
  };
  
  return (
    <View>
      <TouchableOpacity onPress={() => handleSelect('solaire')} style={styleCard.container}>
        <Image source={require('./img/solaire-profile.jpg')}style={{ width: 100, height: 100 }}/>
        <Text style={styleCard.description}>Solaire di Astora è un personaggio che appare in Dark Souls</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelect('lautrec')} style={styleCard.container}>
        <Image source={require('./img/lautrec-profile.jpg')} style={{ width: 100, height: 100 }} />
        <Text style={styleCard.description}>Knight Lautrec è un personaggio di Dark Souls e Dark Souls Remastered.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelect('siegmeyer')} style={styleCard.container}>
        <Image source={require('./img/siegmeyer-profile.jpg')} style={{ width: 100, height: 100 }} />
        <Text style={styleCard.description}>Un cavaliere che giura fedeltà a un ordine di guerrieri non identificato.</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailsScreen: ScreenFC<"Detail"> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {route.params?.selectedValue === 'solaire' ? (
      <Image source={require('./img/solaire-profile.jpg')} style={{ width: 100, height: 100 }} />
    ) : route.params?.selectedValue === 'lautrec' ? (
      <Image source={require('./img/lautrec-profile.jpg')} style={{ width: 100, height: 100 }} />
    ) : route.params?.selectedValue === 'siegmeyer' ? (
      <Image source={require('./img/siegmeyer-profile.jpg')} style={{ width: 100, height: 100 }} />
    ) : (
      <Text>Details Screen</Text>
    )}

      <Button title="Go to Third" onPress={() => navigation.navigate('Third')}/>
    </View>
  );
};
const ThirdScreen: ScreenFC<"Third"> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Third Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Card1} />
      <Stack.Screen name='Detail' component={DetailsScreen} />
      <Stack.Screen name="Third" component={ThirdScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Detail" component={DetailsScreen} />
      {/* Aggiungi altri Drawer.Screen qui */}
    </Drawer.Navigator>
  );
}
function TabNavigator(){
  return (
  <Tab.Navigator>
        <Tab.Screen name="Home" component={StackNavigator} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
        />
        <Tab.Screen name="Detail" component={DetailsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }} 
        />
        {/* Aggiungi altri Tab.Screen qui */}
      </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      
    </NavigationContainer>
  );
};

export default App;