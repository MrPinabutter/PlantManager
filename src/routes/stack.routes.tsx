import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import Confirmation from '../pages/Confirmation';
import UserIdentification from '../pages/UserIdentification';
import PlantSelect from '../pages/PlantSelect';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator 
      headerMode='none'
      screenOptions={{
        cardStyle: {
          borderColor: colors.white
        }
      }}
    >
      <stackRoutes.Screen 
        name="Welcome" 
        component={Welcome} 
      />

      <stackRoutes.Screen 
        name="UserIdentification" 
        component={UserIdentification}
      />
      
      <stackRoutes.Screen 
        name="Confirmation" 
        component={Confirmation} 
      />
      
      <stackRoutes.Screen 
        name="PlantSelect" 
        component={PlantSelect} 
      />
    </stackRoutes.Navigator>
  );
}

export default AppRoutes;