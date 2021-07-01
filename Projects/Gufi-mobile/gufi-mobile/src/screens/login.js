import React, {Component} from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api'

export default class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email : '',
            senha : ''
        }
    }

    relizarLogin = async () => {

        const resposta = await api.post('/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        const token = resposta.data.token
        // console.warn(token)  

        await AsyncStorage.setItem('userToken', token)

        this.props.navigation.navigate('Main')
    }

    render(){ 
        return(
            <ImageBackground
                source={require('../../assets/img/login.png')}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.overlay}/>
                <View style={styles.main}>

                    <Image 
                        source={require('../../assets/img/loginIcon2x.png')}
                        style={styles.mainImgLogin}
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder='username'
                        placeholderTextColor='#FFF'
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder='password'
                        placeholderTextColor='#FFF'
                        secureTextEntry={true}
                        onChangeText={senha => this.setState({ senha })}
                    />
                    
                    <TouchableOpacity style={styles.btnLogin} onPress={this.relizarLogin}>
                        <Text style={styles.btnLoginText}>Login</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}

// Objetos de estilo
const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(183, 39, 255, 0.79)'
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainImgLogin: {
        tintColor: '#FFF',
        width: 90,
        height: 100,
        margin: 60,
        marginTop: 0
    },

    inputLogin: {
        width: 240,
        height: 30,
        marginBottom: 40,
        fontSize: 18,
        color: '#FFF',
        borderColor: '#FFF',
        borderBottomWidth: 2 
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 240,
        backgroundColor: '#FFF',
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        borderRadius: 4,
        shadowOffset: { height: 1, width: 1 }
    },

    btnLoginText: {
        fontSize: 12,
        // fontFamily: 'Open Sans Light'
        color: '#B727FF',
        letterSpacing: 6,
        textTransform: 'uppercase'
    }

});