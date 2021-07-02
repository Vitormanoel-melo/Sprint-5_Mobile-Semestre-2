import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Perfil extends Component {
  constructor(props){
    super(props)

    this.state = {
      permissao : '',
      email : '',
      nome : ''
    }
  }

  // Função queusca os dados do usuário
  buscarDadosStorage = async () => {
   try {
    // armazena o token
    const token = await AsyncStorage.getItem('userToken-acess_spmg_')

    // atualiza os states de permissão, email e senha utilizando o jwtDecode para decodificar o token e pegar os dados
    this.setState({permissao : jwtDecode(token).role, email : jwtDecode(token).email, nome : jwtDecode(token).name, })
   } catch (error) {
     
   }
  }

  componentDidMount(){
    this.buscarDadosStorage()
  }

  // Função que realiza o logout do usuário
  realizaLogout = async () => {
    try {
      // limpa o token do armazenamento
      await AsyncStorage.removeItem('userToken-acess_spmg_')
      // Empurra o usuário para a tela de login
      this.props.navigation.navigate('Login')

    } catch (error) {
      
    }
  }

  render(){
    return (
      <View style={styles.main}>
        <View style={styles.mainPerfil}>
          <View style={styles.mainPerfilContainer}>
            <View style={styles.mainCirclePerfil}>
              <Image 
                source={this.state.permissao === '1' ? require('../../assets/img/crowns.png') : this.state.permissao === '2' ? require('../../assets/img/doctor.png') : this.state.permissao === '3' && require('../../assets/img/patient.png')}
                style={styles.mainImgPerfil}
              />
            </View>
            <Text style={{color: '#645E5E'}}>Você está logado como {this.state.permissao === '1' ? 'Administrador'.toUpperCase() : this.state.permissao === '2' ? 'Médico'.toUpperCase() : this.state.permissao === '3' && 'Paciente'.toUpperCase()}</Text>
          </View>
          <View style={styles.mainPerfilDados}>
            <Text style={styles.mainPerfilDadosText}>{this.state.nome}</Text>
            <Text style={styles.mainPerfilDadosText}>{this.state.email}</Text>
          </View>
        </View>        
  
        <View style={styles.mainPerfilSair}>
          <TouchableOpacity onPress={this.realizaLogout} style={styles.mainBtnSair} >
            <Text style={styles.mainBtnSairText}>Sair</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },

  mainPerfil: {
    height: 250,
    // backgroundColor: 'red',
    justifyContent:   'space-between'
  },

  mainPerfilContainer: {
    height: '55%',
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 25
  },

  mainPerfilDados: {
    alignItems: 'center',
    marginBottom: 15
  },
  
  mainPerfilDadosText: {
    marginTop: 8,
    color: '#645E5E'
  },

  mainCirclePerfil: {
    width: 100,
    height: 100,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    backgroundColor: '#CCC'
  },

  mainImgPerfil: {
    width: 70,
    height: 70,
  },

  mainPerfilSair: {
    alignItems: 'center',
    marginTop: 150
  },

  mainBtnSair: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderTopColor: '#CCC',
    borderTopWidth: 1
  },

  mainBtnSairText: {
    color: '#8DBBE0',
    fontWeight: '600',
    fontSize: 16
    // textTransform: 'uppercase'
  }

});