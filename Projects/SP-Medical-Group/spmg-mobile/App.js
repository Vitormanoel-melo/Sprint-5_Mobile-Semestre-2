import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Main from './src/screens/main'
import Login from './src/screens/login'

const AuthStack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>

      <AuthStack.Navigator
        headerMode='none'
      >
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='Main' component={Main} />
      </AuthStack.Navigator>

    </NavigationContainer>
  )
}