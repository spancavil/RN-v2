import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Post from '../screens/Post';
import SinglePost from './SinglePost';

export default class Posts extends Component{
    constructor (props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <FlatList
                data = {this.props.posts}
                keyExtractor = {post => post.createdAt.toString()}
                renderItem = {({item}) => {
                    return <SinglePost {...item}/>
                }}
            ></FlatList>
        )
    }
}