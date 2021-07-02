import React, {Component} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Consultas from './consultas'
import Perfil from './perfil'

const Tab = createMaterialTopTabNavigator();

export default class Main extends Component{
    render(){
        return (
            <Tab.Navigator
                tabBarPosition='bottom'
                initialRouteName='Consultas'
                activeTintColor= '#FFF'
                tabBarOptions={{
                    showIcon: true,
                    showLabel: false,
                    style: {
                        backgroundColor: '#FFF',
                    },
                    indicatorStyle: {
                    }
                }}
                screenOptions={ ({route}) => ({
                    tabBarIcon: () => {
                        if(route.name === 'Consultas'){
                            return(
                                <Image 
                                    source={require('../../assets/img/prancheta.png')}
                                    style={styles.imgConsultas}
                                />
                            )
                        }

                        if(route.name === 'Perfil'){
                            return(
                                <Image 
                                    source={require('../../assets/img/person-2.svg')}
                                    style={styles.imgPerfil}
                                />
                            )
                        }
                    }
                })}
            >
                <Tab.Screen name='Consultas' component={Consultas} />
                <Tab.Screen name='Perfil' component={Perfil} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgConsultas: {
    width: 30,
    height: 30,
    tintColor: '#81AFD4'
  },

  imgPerfil: {
    width: 29,
    height: 29,
    tintColor: '#81AFD4'
  }
});