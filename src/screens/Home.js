import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Posts from '../components/Posts';
import { auth, firestoredb } from '../firebase/config';

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    handleLogout(){
        auth.signOut()
        .then(()=>{
            alert('User sign out!');    
        })
    }
    
    componentDidMount(){
        firestoredb.collection("posts")
            .onSnapshot((querySnapshot) => { //En cada cambio de la collection se extrae el snapShot
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        const data = doc.data(); //Extraemos los datos del documento en cuestión
                        const arrayAux = this.state.posts.filter(post => post.createdAt !== data.createdAt) //Filtramos de nuestro estado a aquellos post que NO sea el repetido
                        const posteoRepetido = this.state.posts.find(post => post.createdAt === data.createdAt) //Encontramos el posteo repetido (si lo hubiera)
                        
                        //Si no hay posteos repetidos..
                        if (!posteoRepetido){
                            this.setState({
                                posts: this.state.posts.concat({
                                    comment: data.comment,
                                    username: data.username,
                                    likes: data.likes,
                                    createdAt: data.createdAt
                                    })
                            });
                        }

                        //Si encontramos un posteo repetido, actualizamos su array de likes
                        else {
                            posteoRepetido.likes = data.likes;
                            arrayAux.push(posteoRepetido);
                            this.setState({
                                posts: arrayAux
                            })
                        }
                    })
            });
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style ={styles.mainText}>Bienvenido a UDeSA app 
                    {this.props.user && this.props.user.email}</Text>
                {this.props.user !== null &&
                <>
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = {()=> this.handleLogout()}
                    >
                        <Text style = {styles.textButton}>
                            LogOut
                        </Text>
                    </TouchableOpacity>
                    <Posts posts = {this.state.posts}></Posts>
                </>
                }
                {this.props.user === null && 
                    <View style = {styles.containerButton}>
                        <TouchableOpacity 
                            style = {styles.button}
                            onPress = {()=> this.props.navigation.navigate('Register')}
                        
                        >
                            <Text style = {styles.textButton}>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {styles.button}
                            onPress = {()=> this.props.navigation.navigate('Login')}
                        >
                            <Text style = {styles.textButton}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainText:{
        textAlign: 'center',
        fontSize: 30,
    },
    container: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor:"#EADCA6",
        alignItems: 'center'
    },
    containerButton: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 50,
    },
    button: {
        marginTop: 30,
        padding: 10,
        width: '50%',
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