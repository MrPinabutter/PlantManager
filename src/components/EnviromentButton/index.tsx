import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export default function EnviromentButton({title, active=false, ...rest} : EnviromentProps) {

  return(
    <RectButton 
      style={[styles.container, active && styles.containerActive]} 
      {...rest}
    >
      <Text style={[styles.title, active && styles.textActive]}> 
        {title} 
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: colors.shape,
    borderRadius: 12,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },

  containerActive: {
    backgroundColor: colors.green_light,
  },
  
  title: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
    backgroundColor: colors.green_light,
  },
})