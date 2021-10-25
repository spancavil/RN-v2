import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHeart } from '@fortawesome/free-solid-svg-icons'
import { auth, firestoredb } from '../firebase/config';
import firebase from 'firebase/app';

export default function SinglePost (props){

    function handleLike(fecha){
        const usuario = auth.currentUser.displayName;
        firestoredb.collection('posts').where('createdAt', '==', fecha).limit(1).get().then(query => {
            const post = query.docs[0];
            let postToUpdate = post.data();
            const user = postToUpdate.likes.find(user=> user === usuario)
            
            if (!user) {
                postToUpdate.likes.push(usuario);
                post.ref.update(postToUpdate);
            }
        });
    }

    return(
        <View style = {styles.container}>
            <Text style={styles.comment}>{props.comment}</Text>
            <Text style={styles.like}>{props.likes.length} like</Text>
            <View style = {styles.inline}>
                <Text style={styles.like}>{props.username}</Text>
                <Text style={styles.like}>{Math.floor((Date.now() - props.createdAt)/(1000 * 3600))} hours ago</Text>
            </View>
            <TouchableOpacity style = {styles.inline} onPress={()=> handleLike(props.createdAt)}>
                <FontAwesomeIcon icon={faHeart}/>
                <Text style={styles.like}>Like</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e3ce7c",
        marginVertical: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: "flex-start",
        width: 350
    },
    inline: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10
    },
    comment: {
        fontSize: 20
    },
    like: {
        paddingVertical: 5,
        fontSize: 16
    }
})