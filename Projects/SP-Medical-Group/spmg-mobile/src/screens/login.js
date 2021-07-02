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

  // Função que realiza login
  realizarLogin = async () => {
    try {
      // deixa o state isLoading como true
      this.setState({ isLoading : true })

      // faz a requisição passando o email e senha
      const resposta = await api.post('/login',{
        email: this.state.email,
        senha: this.state.senha
      })

      // Se o status da resposta for 200 - OK
      if(resposta.status === 200){
        // armazena o token com a chave e o valor
        await AsyncStorage.setItem('userToken-acess_spmg_', resposta.data.token)
        // deixa o isLoading false
        this.setState({ isLoading : false })

        // manda o usuário para a tela principal
        this.props.navigation.navigate('Main')
        // chama a função limparCampos
        this.limparCampos()
      }

    } catch (error) {
      // caso dê algum erro, define uma mensagem para o state mensagemErro e coloca o isLoading como false
      this.setState({ mensagemErro : 'E-mail ou senha inválidos! Tente novamente!', isLoading : false })
    }
  }

  // Função que limpa os campos de email, senha e mensagemErro
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
                autoCapitalize='none'
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

            {
              this.state.isLoading === true ?
              <TouchableOpacity disabled={true} style={styles.btnLogin} onPress={this.realizarLogin}>
                <Text style={styles.btnLoginText}>Loading...</Text>
              </TouchableOpacity> : 

              <TouchableOpacity disabled={this.state.email === '' || this.state.senha === '' ? 'none' : '' } style={styles.btnLogin} onPress={this.realizarLogin}>
              <Text style={styles.btnLoginText}>Login</Text>
            </TouchableOpacity>
            }
           
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