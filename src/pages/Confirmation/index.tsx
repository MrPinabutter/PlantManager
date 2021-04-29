import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😄', 
  hug: '🤗'
}

export default function Confirmation() {
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { 
    title,
    subtitle,
    buttonTitle, 
    icon,
    nextScreen
  } = params as Params;

  function handleMoveOn() {
    navigate(nextScreen)
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title} >
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button text={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%'
  },

  title: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 15
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },

  emoji: {
    fontSize: 78
  },

  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})