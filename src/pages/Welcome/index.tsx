import React from 'react';
import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import watering from '../../assets/watering.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Welcome() {
  const { navigate } = useNavigation();
  
  function handleStart() {
    navigate('UserIdentification');
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>

        <Text style={styles.title}>
          Gerencie {'\n'} 
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={watering} 
          style={styles.image}
          resizeMode="contain"  
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7} 
          style={styles.button}
          onPress={handleStart}
        >
          <Feather 
            name="chevron-right" 
            style={styles.buttonIcon}
          />  

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  wrapper: {  
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get('window').width*0.7,
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },

  buttonIcon: {
    fontSize: 32,
    color: colors.white
  }
})