import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from '../services/api';

export default class Consultas extends Component {
  constructor(props){
    super(props)

    this.state = {
      listaConsultas : [],
      permissao : '',
      idConsulta : 0
    }
  }

  // Função que formata a hora para não mostrar os segundos
  formatarHora = (hora) => {
    try {
      // armazena a hora
      var horaFormatada = hora.split(':')[0]
      // armazena a hora + os minutos
      horaFormatada = horaFormatada + ':' + hora.split(':')[1]

      // retorna essa data formatada
      return horaFormatada;
    } catch (error) {
      
    }
  }

  // Função que busca os dados do usuário e armazena a role em um state
  buscarDadosStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken-acess_spmg_')

      await this.setState({ permissao: jwtDecode(token).role })
    } catch (error) {
      
    }
  }

  // Função que busca as consultas do usuário logado
  buscarConsultas = async () => {
    try {
      // armazena o token
      const token = await AsyncStorage.getItem('userToken-acess_spmg_')
      // busca os dados do usuário
      this.buscarDadosStorage();

      // se a permissão for administrador
      if(this.state.permissao === '1'){

        // faz a requisição para o endpoint /consultas passando o token
        const resposta = await api.get('/consultas', {
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
        // armazena no state os dados da resposta
        this.setState({listaConsultas : resposta.data})

      }else{
        // se não, o usuário será paciente ou médico
        // então faz a requisição com o complemento da url em /consultas/minhas passando o token
        const resposta = await api.get('/consultas/minhas', {
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
    
        // armazena no state os dados da resposta
        this.setState({listaConsultas : resposta.data})
      }
    } catch (error) {
      
    }

  }

  componentDidMount(){
    this.buscarDadosStorage();
    this.buscarConsultas();
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
            keyExtractor={item => item.dataConsulta}
            renderItem={this.renderItem}
          />
        </View>
        
      </View>
    );
  }

  renderItem = ({item}) => (
    this.state.permissao === '1' ?
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
            <Text>Hora: {this.formatarHora(item.horaConsulta)}</Text>
          </View>
          <View 
            style={item.idSituacaoNavigation.descricao === 'Realizada' ? styles.situacaoRealizada : 
            item.idSituacaoNavigation.descricao === 'Agendada' ? styles.situacaoAgendada : styles.situacaoCancelada
            }
          >
            <Text style={{textTransform: 'capitalize'}}>Situação: {item.idSituacaoNavigation.descricao}</Text>
          </View>
        </View>
      </View>

        <View style={styles.medico}>
          <View style={styles.flatInfoText}>
            <Text style={styles.infoText}>Médico</Text>
          </View>
          <View style={styles.dadosMedico}>
            <View style={styles.dadoInfo}>
              <Text style={styles.nomeMedico}>{item.idMedicoNavigation.nome}</Text>
            </View>
            <View style={styles.dadoInfo}>
              <Text>Especialidade: {item.idMedicoNavigation.idEspecialidadeNavigation.descricao}</Text>
            </View>
          </View>
        </View>

        <View style={styles.medico}>
          <View style={styles.flatInfoText}>
            <Text style={styles.infoText}>Paciente</Text>
          </View>
          <View style={styles.dadosMedico}>
            <View style={styles.dadoInfo}>
              <Text style={styles.nomeMedico}>{item.idPacienteNavigation.nome}</Text>
            </View>
            <View style={styles.dadoInfo}>
              <Text>Data de Nascimento: {Intl.DateTimeFormat('pt-BR').format(new Date(item.idPacienteNavigation.dataNascimento))}</Text>
            </View>
          </View>
        </View>

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

    </View> :


    // Médicos / Pacientes
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
            <Text>Hora: {this.formatarHora(item.horaConsulta)}</Text>
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
    width: '92%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 12,
  },

  situacaoRealizada: {
    width: '92%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 12,
    borderColor: 'green',
    borderWidth: 2,
  },

  situacaoAgendada: {
    width: '92%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 12,
    borderColor: 'orange',
    borderWidth: 2,
  },

  situacaoCancelada: {
    width: '92%',
    height: 36,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 12,
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
  },

});