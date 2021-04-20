import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function UserIdentification() {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { navigate } = useNavigation();

  function handleSubmit() {
    navigate('Confirmation');
  }


  function handleInputBlur() {
    setIsFocused(false);
  }
  
  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    if(!value) setIsFilled(!value);
    setName(value);
  }

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}> 
            <View style={styles.form} >
              <View style={styles.header}>
                <Text style={styles.emoji}> 
                  { name !== '' ? '😄' : '😃'} 
                </Text>

                <Text style={styles.title}> 
                  Como podemos {'\n'} 
                  chamar você?
                </Text>

              </View>

              <TextInput 
                value={name} 
                onChangeText={handleInputChange} 
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                style={[styles.input, (isFocused || isFilled) && {borderColor: colors.green}]}
              />

              <View style={styles.footer}>
                <Button text="Começar" onPress={handleSubmit} />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%'
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center'
  },

  emoji: {
    fontSize: 44
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 32,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20 
  }
})