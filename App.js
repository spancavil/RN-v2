import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { auth } from './src/firebase/config';
import Post from './src/screens/Post';

export default class App extends Component {

  constructor (props){
    super(props);
    this.state = {
      usuario: null
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged( user => {
      if (user){
        this.setState({usuario: user})
      } else {
        console.log("No hay usuario loggeado");
        this.setState({usuario: null})
      }
    })
  }

  render(){
    const Drawer = createDrawerNavigator()

    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {this.state.usuario &&
          <>
            <Drawer.Screen name="Home">
              { (props)=> <Home {...props} user = {this.state.usuario}/>  }
            </Drawer.Screen>
            <Drawer.Screen name="Camera">
              { (props)=> <Camera {...props} user = {this.state.usuario}/>  }
            </Drawer.Screen>
            <Drawer.Screen name="Post">
              { (props)=> <Post {...props} user = {this.state.usuario}/>  }
            </Drawer.Screen>
          </>
          }
          {!this.state.usuario && 
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
          </>
          }
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

