import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        }
    }

    handlePress (){
        alert(`Email: ${this.state.email}, password: ${this.state.password}`)
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(userCredential)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                this.setState({error});
            });
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                    placeholder = "Email"
                    blurOnSubmit = {true}
                    textContentType = "emailAddress"
                    onChangeText = {text => this.setState({email: text})}
                />
                <TextInput style = {styles.input}
                    placeholder = "password"
                    keyboardType = "defaul"
                    secureTextEntry = {true}
                    onChangeText = {text => this.setState({password: text})}
                />
                {this.state.error && <Text>{this.state.error.message}</Text>}
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=> this.handlePress ()}
                >
                    <Text style = {styles.textButton}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor:"#EADCA6",
        alignItems: 'center'
    },
    input: {
        padding: 10,
        width: '80%',
        backgroundColor: "#212121",
        borderColor: "white",
        borderWidth: 2,
        color: "#D9CAB3",
        marginVertical: 4,
        fontFamily: 'Oswald'
    },
    button: {
        marginTop: 30,
        padding: 10,
        width: '40%',
        backgroundColor: "#6D9886",
        justifyContent: "center",
        borderRadius: 5,
        textAlign: "center",
        height: 80,
    },
    textButton: {
        fontSize: 25,
        color: "#212121",
    }
})