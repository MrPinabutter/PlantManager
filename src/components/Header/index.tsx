import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';

import avatar from '../../assets/avatar.png'
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
  const [userName, setUserName] = useState('');


  useEffect(() => {
    async function loadStorageUserName() {
      const name = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(name || ''); 
    }
    loadStorageUserName();
  }, [])

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá, </Text>
        <Text style={styles.userName}>
          {userName}
        </Text>
      </View>

      <Image source={avatar} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 20
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 40
  }
})