import React, {Component} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Convites from './convites'
import Eventos from './eventos'
import Perfil from './perfil'

// constante que armazena a barra de navegação
const bottomTab = createBottomTabNavigator();

export default class Main extends Component {

  render(){ 
    return(
      <View style={styles.main}>
        {/* Componente que abraça todo o contexto de navegaçao */}
          {/* Cria a barra de navegação */}
          <bottomTab.Navigator
            initialRouteName='Eventos'
            tabBarOptions={{
              showLabel: false,
              showIcon: true, 
              activeBackgroundColor: '#B727FF',
              inactiveBackgroundColor: '#DD99FF',
              activeTintColor: '#FFF',
              inactiveTintColor: '#FFF',
              style: { height: 50 }
            }}

            screenOptions = { ({ route }) => ({
              tabBarIcon: () => {
                if (route.name === 'Convites') {
                  return (
                    <Image
                      source={require('../../assets/img/plane.png')}
                      style={styles.tabBarIcon}
                    />
                  )
                }

                if(route.name === 'Eventos'){
                  return(
                    <Image
                      source={require('../../assets/img/calendar.png')}
                      style={styles.tabBarIcon}
                    />
                  )
                }

                if(route.name === 'Perfil'){
                  return(
                    <Image
                    source={require('../../assets/img/profile.png')}
                    style={styles.tabBarIcon}
                    /> 
                  )
                }
              }
            }) }
          >
            {/* Representa cada botão da navegação e qual componente será renderizado em cada uma das telas */}
            <bottomTab.Screen name='Convites' component={Convites}/>
            <bottomTab.Screen name='Eventos' component={Eventos}/>
            <bottomTab.Screen name='Perfil' component={Perfil}/>
          </bottomTab.Navigator>
      </View>
    )
  }
}

// Objetos de estilo
const styles = StyleSheet.create({

  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },

  tabBarIcon: {
    width: 26,
    height: 26
  }

});
