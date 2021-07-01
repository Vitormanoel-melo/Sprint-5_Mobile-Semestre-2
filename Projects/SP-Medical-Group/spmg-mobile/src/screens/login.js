import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api'

export default class Login extends Component {
  constructor(props){
      super(props)

      this.state = {
          email : '',
          senha : '',
          mensagemErro: '',
          isLoading : false
      }
  }

  // realizarLogin = async () => {
  //   try {
  //     this.setState({ isLoading : true })

  //     const resposta = await api.post('/login',{
  //       email: this.state.email,
  //       senha: this.state.senha
  //     })

  //     if(resposta.status === 200){
  //       await AsyncStorage.setItem('userToken-acess_spmg_', resposta.data.token)

  //       this.setState({ isLoading : false })

  //       this.props.navigation.navigate('Main')
  //       this.limparCampos()
  //     }

  //   } catch (error) {
  //     this.setState({ mensagemErro : 'E-mail ou senha inválidos! Tente novamente!', isLoading : false })
  //   }
  // }

  realizarLogin = async () => {
    this.props.navigation.navigate('Main')
  }

  limparCampos = () => {
    this.setState({ email: '', senha: '', mensagemErro: '' })
  }

  render(){
    return (
        <View style={styles.main}>
            <ImageBackground 
                style={StyleSheet.absoluteFillObject}
                source={require('../../assets/img/textura-teste.png')}
            />

            <Image 
                source={require('../../assets/img/logoSVG.svg')}
                style={styles.logoImg}
            />

            <Text style={styles.textBoasVindas}>Bem Vindo! Faça login para acessar o aplicativo!</Text>

            <TextInput
                value={this.state.email}
                style={styles.inputLogin}
                placeholder='E-mail'
                placeholderTextColor='#828282'
                keyboardType='email-address'
                onChangeText={email => this.setState({ email })}
            />

            <TextInput
                value={this.state.senha}
                style={styles.inputLogin}
                placeholder='Senha'
                placeholderTextColor='#828282'
                secureTextEntry={true}
                onChangeText={senha => this.setState({ senha })}
            />

            <View style={styles.mainErroMensagem}>
              <Text style={styles.mensagemDeErro}>{this.state.mensagemErro}</Text>
            </View>

            <TouchableOpacity /*disabled={this.state.isLoading === true && this.state.email === '' || this.state.senha === '' ? 'none' : ''}*/ style={styles.btnLogin} onPress={this.realizarLogin}>
              <Text style={styles.btnLoginText}>Login</Text>
            </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#81AFD4',
    // overflow: 'scroll'
  },

  logoImg: {
    width: 120,
    height: 120,
    tintColor: '#FFF',
    // espaçamento para todos os lados
    margin: 60,
    // menos para cima
    marginTop: 0
  },

  textBoasVindas: {
    marginBottom: 25,
    fontSize: 12,
    color: '#FFF',
    fontWeight: '700'
  },

  inputLogin: {
    width: 260,
    height: 35,
    marginBottom: 30,
    fontSize: 16,
    color: '#828282',
    backgroundColor: '#FFF',
    zIndex: 100,
    paddingLeft: 10,
    borderRadius: 5
  },

  mainErroMensagem: {
    width: 275,
    height: 20,
    // backgroundColor: 'red',
    alignItems: 'center'
  },

  mensagemDeErro: {
    fontSize: 14,
    color: 'red'
  },

  btnLogin: {
    width: 260,
    height: 35,
    backgroundColor: '#81AFD4',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: { height: 2, width: 2 },
    shadowColor: '#828282',
  },

  btnLoginText: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FFF',
  }

});