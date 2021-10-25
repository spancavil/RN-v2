import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
    constructor (props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
            error: null,
        }
    }

    handlePress (){
        alert(`Email: ${this.state.email}, password: ${this.state.password}`);
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                userCredential.user.updateProfile({
                    displayName: this.state.username
                })
                .then(response => console.log(response) )
                .catch(error => console.log(error))
                .finally(alert("Usuario creado!"));
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
                this.setState({error})
                // ..
            });
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                    placeholder = "username"
                    blurOnSubmit = {true}
                    onChangeText = {text => this.setState({username: text})}
                />
                <TextInput style = {styles.input}
                    placeholder = "Email"
                    blurOnSubmit = {true}
                    textContentType = "emailAddress"
                    onChangeText = {text => this.setState({email: text})}
                />
                <TextInput style = {styles.input}
                    placeholder = "password"
                    secureTextEntry = {true}
                    onChangeText = {text => this.setState({password: text})}
                />
                <TextInput style = {styles.input}
                    placeholder = "confirm password"
                    secureTextEntry = {true}
                    onChangeText = {text => this.setState({confirm: text})}
                />
                {this.state.error && <Text>{this.state.error.message}</Text>}
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=> this.handlePress ()}
                >
                    <Text style = {styles.textButton}>
                        Register
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