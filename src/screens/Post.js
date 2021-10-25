import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { auth, firestoredb, storage } from '../firebase/config';


export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment: ""
        }
    }

    handlePost(){
        firestoredb.collection('posts').add(
            {
                comment: this.state.comment,
                username: auth.currentUser.displayName,
                createdAt: Date.now(),
                likes: []
            })
        .then(response => {
            console.log(response)
            this.setState({
                comment: ""
            })
            this.props.navigation.navigate('Home')
        })
        .catch(error => {
            console.log(error)
        })

    }
    
    render() {
        
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                    placeholder = "Your comment"
                    blurOnSubmit = {true}
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText = {text => this.setState({comment: text})}
                    value={this.state.comment}
                />
                
                {this.state.error && <Text>{this.state.error.message}</Text>}
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=> this.handlePost ()}
                >
                    <Text style = {styles.textButton}>
                        Post
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