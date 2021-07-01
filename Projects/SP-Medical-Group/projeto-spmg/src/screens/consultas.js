import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from '../services/api';

export default class Consultas extends Component {
  constructor(props){
    super(props)

    this.state = {
      listaConsultas : [],
      permissao : ''
    }
  }

  buscarDadosStorage = async () => {
    const token = await AsyncStorage.getItem('userToken-acess_spmg_')

    await this.setState({ permissao: jwtDecode(token).role })
  }


  buscarConsultas = async () => {
    const token = await AsyncStorage.getItem('userToken-acess_spmg_')

    const resposta = await api.get('/consultas/minhas', {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })

    this.setState({listaConsultas : resposta.data})
  }

  componentDidMount(){
    this.buscarConsultas();
    this.buscarDadosStorage();
  }

  render(){
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View>
            <Text style={styles.mainHeaderText}>Suas Consultas</Text>
          </View>
          <View style={styles.mainHeaderLine}/>
        </View>
  
        <View style={styles.mainBody}>
          <FlatList 
            contentContainerStyle={styles.mainFlatList}
            data={this.state.listaConsultas}
            keyExtractor={item => item.idConsulta}
            renderItem={this.renderItem}
          />
        </View>
        
      </View>
    );
  }

  renderItem = ({item}) => (
    <View style={styles.consulta}>

      <View style={styles.infoConsulta}>
        <View style={styles.flatInfoText}>
          <Text style={styles.infoText}>Informações da consulta</Text>
        </View>
        <View style={styles.infoConsultaDados}>
          <View style={styles.dadoInfo}>
            <Text>Data: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
          </View>
          <View style={styles.dadoInfo}>
            <Text>Hora: {item.horaConsulta}</Text>
          </View>
          <View 
            style={item.situacao === 'Realizada' ? styles.situacaoRealizada : 
            item.situacao === 'Agendada' ? styles.situacaoAgendada : styles.situacaoCancelada
            }
          >
            <Text style={{textTransform: 'capitalize'}}>Situação: {item.situacao}</Text>
          </View>
        </View>
      </View>
  
      {
        this.state.permissao === '3' ?
        <View style={styles.medico}>
          <View style={styles.flatInfoText}>
            <Text style={styles.infoText}>Médico</Text>
          </View>
          <View style={styles.dadosMedico}>
            <View style={styles.dadoInfo}>
              <Text style={styles.nomeMedico}>{item.nomeMedico}</Text>
            </View>
            <View style={styles.dadoInfo}>
              <Text>Especialidade: {item.especialidade}</Text>
            </View>
          </View>
        </View> :

        this.state.permissao === '2' &&
        <View style={styles.medico}>
          <View style={styles.flatInfoText}>
            <Text style={styles.infoText}>Paciente</Text>
          </View>
          <View style={styles.dadosMedico}>
            <View style={styles.dadoInfo}>
              <Text style={styles.nomeMedico}>{item.nomePaciente}</Text>
            </View>
            <View style={styles.dadoInfo}>
              <Text>Data de Nascimento: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataNascimento))}</Text>
            </View>
          </View>
        </View>
      }

      <View style={styles.descricao}>
        <View style={styles.flatInfoText}>
          <Text style={styles.infoText}>Descrição</Text>
        </View>
        <View style={styles.dadosDescricao}>
          <View style={styles.textoDescricao}>
            <Text>{item.descricao}</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },

  mainHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  mainHeaderText: {
    textTransform: 'uppercase'
  },

  mainHeaderLine: {
    width: 200,
    borderBottomColor: 'black',
    marginTop: 8,
    borderBottomWidth: 1,
  },

  mainBody: {
    flex: 9,
    backgroundColor: '#F1F1F1',
  },

  mainFlatList: {
    marginRight: 60,
    marginLeft: 60,
    marginTop: 20,
    // backgroundColor: 'blue'
  },

  consulta: {
    // height: 250,
    marginBottom: 30,
    // flex: 1,
    backgroundColor: '#96B2F6',
    borderRadius: 15
  },

  // Informações da consulta

  infoConsulta: {
    flex: 1,
    // backgroundColor: 'blue'
  },

  flatInfoText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  infoText: {
    color: '#FFF',
    textDecorationLine: 'underline',
    textDecorationColor: '#FFF',
    textTransform: 'uppercase'
  },

  infoConsultaDados: {
    height: 135,
    // backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  dadoInfo: {
    width: '90%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 15,
  },

  situacaoRealizada: {
    width: '90%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 15,
    borderColor: 'green',
    borderWidth: 2,
  },

  situacaoAgendada: {
    width: '90%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 15,
    borderColor: 'orange',
    borderWidth: 2,
  },

  situacaoCancelada: {
    width: '90%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 15,
    borderColor: 'red',
    borderWidth: 2,
  },

  // Dados do médico

  medico: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: 'blue'
  },

  dadosMedico: {
    height: 85,
    // backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  nomeMedico: {
    width: '95%',
    // backgroundColor: 'red'
  },

  // Descrição

  descricao: {
    flex: 1,
    // backgroundColor: 'blue',
    marginTop: 10,
    marginBottom: 20
  },

  dadosDescricao: {
    // backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textoDescricao: {
    width: '90%',
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  }


});